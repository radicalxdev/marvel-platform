import { useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Loader from '@/components/Loader';
import AuthLayout from '@/layouts/AuthLayout';
import MainAppLayout from '@/layouts/MainAppLayout';

import ROUTES from '@/constants/routes';

const AUTH_PAGES = [
  ROUTES.SIGNIN,
  ROUTES.SIGNUP,
  ROUTES.PASSWORD_RESET,
  ROUTES.PRIVACY,
];

const isOnboardingComplete = (user) =>
  user?.onboarding
    ? Object.values(user.onboarding).every((step) => step)
    : false;

const withLayoutRedirect = (PageComponent) => {
  const LayoutWrapper = (props) => {
    const router = useRouter();
    const { data: user, loading: userLoading } = useSelector(
      (state) => state.user
    );
    const { data: authData } = useSelector((state) => state.auth);

    const currentRoute = router.pathname;
    const isAuthPage = AUTH_PAGES.includes(currentRoute);

    const onboardingComplete = useMemo(
      () => isOnboardingComplete(user),
      [user]
    );

    useEffect(() => {
      if (
        !userLoading &&
        user &&
        !onboardingComplete &&
        !isAuthPage &&
        currentRoute !== ROUTES.ONBOARDING
      ) {
        router.push(ROUTES.ONBOARDING);
      }
    }, [
      userLoading,
      user,
      onboardingComplete,
      isAuthPage,
      currentRoute,
      router,
    ]);

    if (isAuthPage) {
      return (
        <AuthLayout isAuthScreen={isAuthPage}>
          <PageComponent {...props} />
        </AuthLayout>
      );
    }

    if (userLoading || !authData) {
      return <Loader />;
    }

    if (!onboardingComplete) {
      return <PageComponent {...props} />;
    }

    return (
      <MainAppLayout>
        <PageComponent {...props} />
      </MainAppLayout>
    );
  };

  if (PageComponent.getInitialProps) {
    LayoutWrapper.getInitialProps = PageComponent.getInitialProps;
  }

  return LayoutWrapper;
};

export default withLayoutRedirect;
