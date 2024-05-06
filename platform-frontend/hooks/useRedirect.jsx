import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LogRocket from 'logrocket';
import { applyActionCode } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

import { auth } from '@/redux/store';

import {
  setEmailVerified,
  setLoading,
  setTotalUsers,
} from '@/redux/slices/authSlice';
import fetchUserData from '@/redux/thunks/user';
import fetchEnrolledChallenges from '@/redux/thunks/enrolledChallenges';

import { amplitude } from './useAmplitudeInit';
import createStripeCustomer from '@/services/user/createStripeCustomer';

import ROUTES from '@/constants/routes';
import { APP_ENV, AUTH_MODES } from '@/constants/auth';
import ALERT_COLORS from '@/constants/notification';

const redirectRegex = /\/redirect.*/;

const useRedirect = (firestore, functions, handleOpenSnackBar) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { route, asPath, query } = router;
  const { data: authData, loading } = useSelector((state) => state.auth);

  const initializeAnalyticsTools = (user, enrolledChallenges) => {
    // Set the user's name and email in amplitude
    const identify = new amplitude.Identify();
    if (user)
      Object.keys(user).forEach((key) => {
        identify?.set(key, user[key]);
      });

    const noOfEnrolledChallenges = enrolledChallenges
      ? Object.keys(enrolledChallenges)?.length
      : 0;

    identify?.set('challenges_enrolled', noOfEnrolledChallenges);

    // Set amplitude user id
    amplitude?.setUserId(auth.currentUser?.uid);
    amplitude?.identify(identify);

    // Initialize LogRocket
    LogRocket?.identify(auth.currentUser?.uid, user);
  };

  const createStripeAccountForUser = async (user) => {
    // If a stripe id exists, return.
    if (!user || user?.stripeId) return;

    const { id, email } = user;

    await createStripeCustomer({
      id,
      email,
    });
  };

  const fetchUserRelatedData = async (id) => {
    const user = await dispatch(fetchUserData({ firestore, id }));
    const enrolledChallenges = await dispatch(
      fetchEnrolledChallenges({ firestore, id })
    );

    initializeAnalyticsTools(user?.payload, enrolledChallenges?.payload);
    createStripeAccountForUser(user?.payload);
  };

  const fetchTotalUsers = async () => {
    try {
      const usersRef = collection(firestore, 'users');
      const userSnapshot = await getDocs(usersRef);

      dispatch(setTotalUsers(userSnapshot.size));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if the current route is an authentication route
    const isAuthUrl = [
      ROUTES.SIGNIN,
      ROUTES.SIGNUP,
      ROUTES.PRIVACY,
      ROUTES.TERMS,
      ROUTES.CREATE_AVATAR,
      ROUTES.PASSWORD_RESET,
    ].includes(route);

    const isRedirectRoute = redirectRegex.test(asPath);
    const isAuthRoute = isAuthUrl || isRedirectRoute;

    // If a authUser is authed, set the currentUser in the store and redirect to home if on an auth route
    if (auth.currentUser) {
      if (isRedirectRoute) {
        dispatch(setLoading(false));
        return;
      }

      // If email is not verified, redirect to sign in
      if (!auth.currentUser.emailVerified) {
        if (!isAuthUrl) {
          router.push(ROUTES.SIGNIN);
          return;
        }
        return;
      }

      // If project is sandbox & user has no admin rights, redirect to sign in
      if (process.env.NEXT_PUBLIC_NODE_ENV === APP_ENV.SANDBOX) {
        if (!authData?.claims?.admin) {
          router.push(ROUTES.SIGNIN).then(async () => {
            await auth.signOut();

            handleOpenSnackBar(
              ALERT_COLORS.ERROR,
              'You do not have admin rights'
            );
          });
          return;
        }
      }

      fetchUserRelatedData(auth.currentUser.uid);
      fetchTotalUsers();

      if (route === ROUTES.CREATE_AVATAR || route === ROUTES.PASSWORD_RESET) {
        return;
      }

      if (isAuthUrl) {
        router.push(ROUTES.HOME);
        return;
      }
      return;
    }

    if (!isAuthRoute && !loading) router.push(ROUTES.SIGNIN);
  }, [authData]);

  useEffect(() => {
    const isRedirectRoute = redirectRegex.test(asPath);

    if (isRedirectRoute) {
      const handleVerifyEmail = async () => {
        try {
          const { oobCode } = query;

          await applyActionCode(auth, oobCode);

          dispatch(setEmailVerified(true));
          router.push(`${ROUTES.CREATE_AVATAR}`);
        } catch (error) {
          handleOpenSnackBar(ALERT_COLORS.ERROR, 'Unable to verify email');
          router.push(`${ROUTES.SIGNUP}`);
          throw new Error(error);
        }
      };

      const { mode, oobCode } = query;

      if (mode === AUTH_MODES.PASSWORD_RESET) {
        router.push(`${ROUTES.PASSWORD_RESET}?oobCode=${oobCode}`);
        return;
      }

      if (mode === AUTH_MODES.VERIFY_EMAIL) {
        if (auth.currentUser?.emailVerified) {
          router.push(ROUTES.CREATE_AVATAR);
          return;
        }

        handleVerifyEmail();
      }
    }
  }, [query]);
};

export default useRedirect;
