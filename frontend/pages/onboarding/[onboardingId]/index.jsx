import { useRouter } from 'next/router';

import OnboardingLayout from '@/layouts/OnboardingLayout';
import OnboardingPage from '@/templates/Onboarding/Onboarding';

/**
 * A functional component that handles individual onboarding pages.
 * It extracts the onboarding ID from the URL query and passes it to the OnboardingPage component.
 *
 * @return {JSX.Element} The OnboardingPage component with the onboarding data.
 */
const IndividualOnboardingPage = () => {
  const router = useRouter();
  const { onboardingId } = router.query;

  const onboardingData = {
    id: Number(onboardingId),
  };

  return <OnboardingPage onboardingData={onboardingData} />;
};

IndividualOnboardingPage.getLayout = function getLayout(page) {
  return <OnboardingLayout>{page}</OnboardingLayout>;
};

export default IndividualOnboardingPage;
