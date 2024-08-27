import { httpsCallable } from 'firebase/functions';
import { functions } from '@/redux/store';
import { ONBOARDING_ERROR_MESSAGES } from '@/constants/onboarding';

const setupUserProfile = async (profileData) => {
  try {
    console.log('profileData:', profileData);
    const updatePreferences = httpsCallable(functions, 'setupUserProfile');
    const response = await updatePreferences(profileData);

    return response.data;
  } catch (error) {
    console.error('setupUserProfile error:', error);
    const errorCode = error.code || error.status || 'internal';
    const errorMessage = error.message || ONBOARDING_ERROR_MESSAGES[errorCode] || 'Failed to setup User Profile';
    throw { code: errorCode, message: errorMessage };
  }
};

export { setupUserProfile };
