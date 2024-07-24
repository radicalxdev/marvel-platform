import { useRouter } from 'next/router';

import OnboardingLayout from '@/layouts/OnboardingLayout';
import OnboardingPage from '@/templates/Onboarding';

const IndividualOnboardingPage = () => {
  const router = useRouter();
  const { onboardingId } = router.query;

  if (!onboardingId) {
    return null;
  }

  return <OnboardingPage />;
};

IndividualOnboardingPage.getLayout = function getLayout(page) {
  return <OnboardingLayout>{page}</OnboardingLayout>;
};

export default IndividualOnboardingPage;
