import { httpsCallable } from 'firebase/functions';

import { functions } from '@/redux/store';

/**
 * Updates the user profile. The update fields mu
 *
 * @param {Object} updateFields - The fields to update in the user profile.
 * @return {Promise} A promise that resolves when the user profile is updated successfully.
 */
const updateUserProfile = async (updateFields) => {
  try {
    const updateProfile = httpsCallable(functions, 'updateProfile');

    await updateProfile({ profileData: updateFields });
  } catch (error) {
    throw new Error('Error updating user document.');
  }
};

export default updateUserProfile;
