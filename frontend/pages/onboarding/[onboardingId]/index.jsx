import { useRouter } from 'next/router';

import useOnboardingProps from '@/hooks/useOnboardingProps'; // Adjust the path based on your actual structure

import OnboardingLayout from '@/layouts/OnboardingLayout';
import OnboardingPage from '@/templates/Onboarding';

const IndividualOnboardingPage = () => {
  const router = useRouter();
  const { onboardingId } = router.query;

  const { onboardingData, loading } = useOnboardingProps(onboardingId);

  if (loading || !onboardingData) {
    if (!onboardingData && !loading) router.push('/'); // Redirect if onboarding data is not found
    return null;
  }

  return <OnboardingPage onboardingData={onboardingData} />;
};

IndividualOnboardingPage.getLayout = function getLayout(page) {
  return <OnboardingLayout>{page}</OnboardingLayout>;
};

export default IndividualOnboardingPage;
