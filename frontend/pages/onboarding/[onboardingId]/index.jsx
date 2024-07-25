import { useRouter } from 'next/router';

import OnboardingLayout from '@/layouts/OnboardingLayout';
import OnboardingPage from '@/templates/Onboarding/Onboarding';

const IndividualOnboardingPage = () => {
  const router = useRouter();
  const { onboardingId } = router.query;

  // Mock data
  const onboardingData = {
    id: Number(onboardingId), // Ensure the id is a number
    title: 'Welcome to Kai!',
    content: 'Let’s get started!',
  };

  // Simulating loading state
  const loading = false;

  if (loading) {
    return <div>Loading...</div>;
  }

  return <OnboardingPage onboardingData={onboardingData} />;
};

IndividualOnboardingPage.getLayout = function getLayout(page) {
  return <OnboardingLayout>{page}</OnboardingLayout>;
};

export default IndividualOnboardingPage;
