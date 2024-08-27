import { httpsCallable } from 'firebase/functions';
import { functions } from '@/redux/store';
import { ONBOARDING_ERROR_MESSAGES } from '@/constants/onboarding';

const advanceOnboardingStatus = async (uid) => {
  try {
    const advanceStatus = httpsCallable(functions, 'advanceOnboardingStatus');
    const response = await advanceStatus({ uid });

    return response.data; // Assuming the callable function returns a data object
  } catch (error) {
    console.error('advanceOnboardingStatus error:', error); // Log the full error object

    const errorCode = error.code || error.status || 'internal';
    const errorMessage = error.message || ONBOARDING_ERROR_MESSAGES[errorCode] || 'Failed to advance onboarding status';

    throw { code: errorCode, message: errorMessage };
  }
};

export { advanceOnboardingStatus };
