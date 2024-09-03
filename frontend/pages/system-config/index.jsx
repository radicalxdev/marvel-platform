import { useSelector } from 'react-redux';

import OnboardingLayout from '@/layouts/OnboardingLayout';

import SystemConfiguration from '@/templates/ProfileSetup/SystemConfiguration';

import { updateUserPreferences } from '@/services/onboarding/updateUserPrefences';

const SystemConfig = () => {
  const userData = useSelector((state) => state.user.data);
  const handleConfigSubmit = async (preferenceData) => {
    const userPreference = {
      userId: userData.id,
      ...preferenceData,
    };
    try {
      const response = await updateUserPreferences(userPreference);
      console.log(response.message);
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
