import { httpsCallable } from 'firebase/functions';

import { ONBOARDING_ERROR_MESSAGES } from '@/constants/onboarding';

import { functions } from '@/redux/store';

const updateUserPreferences = async (userPreferences) => {
  try {
    const sysConfig = httpsCallable(functions, 'updateUserPreferences');
    const response = await sysConfig(userPreferences);
    return response.data;
  } catch (error) {
    const errorCode = error.code || error.status || 'internal';
    const errorMessage =
      error.message ||
      ONBOARDING_ERROR_MESSAGES[errorCode] ||
      'Failed to setup User Profile';
    throw new Error(errorMessage);
  }
};

export { updateUserPreferences };
