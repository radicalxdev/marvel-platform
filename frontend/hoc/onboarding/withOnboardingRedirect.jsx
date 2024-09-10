import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import ROUTES from '@/constants/routes';

const withOnboardingRedirect = (WrappedComponent) => {
  return function (props) {
    const router = useRouter();
    const { data: user, loading } = useSelector((state) => state.user);

    useEffect(() => {
      const lastIncompleteOnboardingStep = (onboarding) => {
        // Assume step 1 if onboarding data is not available
        if (!onboarding) {
          return 1;
        }

        // Iterate through the onboarding steps to find the first incomplete step
        for (let i = 1; i <= 5; i += 1) {
          if (!onboarding[i]) {
            return i;
          }
        }

        // Return 6 if all steps are completed
        return 6;
      };

      const directOnboardingScreen = () => {
        if (user && user.onboarding) {
          const lastIncompleteStep = lastIncompleteOnboardingStep(
            user.onboarding
          );

          // Redirect based on the last incomplete step
          switch (lastIncompleteStep) {
            case 1:
              router.push(ROUTES.WELCOME_ONBOARDING);
              break;
            case 2:
              router.push(ROUTES.PROFILE_SETUP);
              break;
            // Add cases for steps 3, 4, 5, etc., when ready
            default:
              // Proceed normally if all steps are completed
              break;
          }
        }
      };

      if (!loading) {
        directOnboardingScreen();
      }
    }, [user, loading, router]);

    return <WrappedComponent {...props} />;
  };
};

export default withOnboardingRedirect;
