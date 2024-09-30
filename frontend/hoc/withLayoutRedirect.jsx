import { useRouter } from 'next/router';

import AuthLayout from '@/layouts/AuthLayout';
import MainAppLayout from '@/layouts/MainAppLayout';

import ROUTES from '@/constants/routes';

const withLayoutRedirect = (PageComponent) => {
  const LayoutWrapper = (props) => {
    const router = useRouter();
    const currentRoute = router.pathname;

    const authPages = [
      ROUTES.SIGNIN,
      ROUTES.SIGNUP,
      ROUTES.PASSWORD_RESET,
      ROUTES.PRIVACY,
    ];

    const isAuthPage = authPages.includes(currentRoute);
    const isAuthScreen = [
      ROUTES.SIGNIN,
      ROUTES.SIGNUP,
      ROUTES.PASSWORD_RESET,
    ].includes(currentRoute);

    if (isAuthPage) {
      return (
        <AuthLayout isAuthScreen={isAuthScreen}>
          <PageComponent {...props} />
        </AuthLayout>
      );
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
