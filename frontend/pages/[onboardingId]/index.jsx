import { useRouter } from 'next/router';

import OnboardingLayout from '@/layouts/OnboardingLayout/';
import OnboardingPage from '@/templates/Onboarding';

import ROUTES from '@/constants/routes';

const IndividualOnboardingPage = () => {
  const router = useRouter();

  const { onboardingId } = router.query;

  if (!onboardingId) {
    router.push(ROUTES.HOME);
    return null;
  }

  return <OnboardingPage />;
};
IndividualOnboardingPage.getLayout = function getLayout(page) {
  return <OnboardingLayout>{page}</OnboardingLayout>;
};

export default IndividualOnboardingPage;
