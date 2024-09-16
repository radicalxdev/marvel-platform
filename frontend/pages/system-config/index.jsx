import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import OnboardingLayout from '@/layouts/OnboardingLayout';

import SystemConfiguration from '@/templates/SystemConfig';

import ROUTES from '@/constants/routes';

import { setupUserSystemConfig } from '@/services/onboarding/setupUserSystemConfig';

const SystemConfig = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.user.data);
  const handleConfigSubmit = async (preferenceData) => {
    const userPreference = {
      uid: userData.id,
      ...preferenceData,
    };
    try {
      const response = await setupUserSystemConfig(userPreference);
      console.log(response.message);
      router.push(ROUTES.FINAL_STEPS);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return <SystemConfiguration onSubmit={handleConfigSubmit} />;
};

SystemConfig.getLayout = function getLayout(page) {
  return <OnboardingLayout currentStep={2}>{page}</OnboardingLayout>;
};

export default SystemConfig;
