import { useEffect } from 'react';

import { applyActionCode } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { APP_ENV, AUTH_MODES } from '@/constants/auth';
import ALERT_COLORS from '@/constants/notification';
import ROUTES from '@/constants/routes';

import {
  setEmailVerified,
  setLoading,
  setTotalUsers,
} from '@/redux/slices/authSlice';
import { auth } from '@/redux/store';
import fetchUserData from '@/redux/thunks/user';

const redirectRegex = /\/redirect.*/;

const useRedirect = (firestore, functions, handleOpenSnackBar) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { route, asPath, query } = router;
  const { data: authData, loading } = useSelector((state) => state.auth);

  const fetchUserRelatedData = async (id) => {
    await dispatch(fetchUserData({ firestore, id }));
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
          router.push(`${ROUTES.HOME}`);
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
          router.push(ROUTES.HOME);
          return;
        }

        handleVerifyEmail();
      }
    }
  }, [query]);
};

export default useRedirect;
