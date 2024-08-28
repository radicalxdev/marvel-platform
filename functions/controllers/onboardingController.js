/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;
const DEBUG = process.env.DEBUG;

async function progressOnboardingStatus(id, progressOnly = false) {
  DEBUG && logger.log('Advance Onboarding Status method started');

  // Validate if userId is not empty string or null
  if (!id || typeof id !== 'string') {
    DEBUG && logger.error('Invalid user ID:', id);
    // eslint-disable-next-line no-throw-literal
    throw { code: 400, message: 'Invalid user ID' };
  }

  try {
    // Get User from Firestore Database
    const db = admin.firestore();
    const userRef = db.collection('users').doc(id);
    const userDoc = await userRef.get();

    // Validate if user exists
    if (!userDoc.exists) {
      DEBUG &&
        logger.error(
          'Error in progressing Onboarding Status:',
          'User not found'
        );
      // eslint-disable-next-line no-throw-literal
      throw { code: 403, message: 'User not found' };
    }
    DEBUG && logger.info('User found in database');

    // Get the onboarding object from the user
    // if not onboarding object, return an empty object
    const user = userDoc.data();
    let onboarding = user.onboarding || {};

    // Destructure the onboarding object with default values
    let {
      1: step1 = false,
      2: step2 = false,
      3: step3 = false,
      4: step4 = false,
      5: step5 = false,
    } = onboarding;

    // Checking error on onboarding status structure
    // Check if any step is missing
    const needsUpdate = !(
      1 in onboarding &&
      2 in onboarding &&
      3 in onboarding &&
      4 in onboarding &&
      5 in onboarding
    );

    // Check if there's an error in the sequence
    // eg. 1= false, 2 = true ...
    const hasError =
      (!step1 && (step2 || step3 || step4 || step5)) ||
      (!step2 && (step3 || step4 || step5)) ||
      (!step3 && (step4 || step5)) ||
      (!step4 && step5);

    // Validate if there's an error or needs update
    if (needsUpdate || hasError) {
      DEBUG && logger.info('Onboarding status will be updated');
      onboarding = {
        1: step1,
        2: step2,
        3: step3,
        4: step4,
        5: step5,
      };

      // if there's an error, reset the onboarding status
      if (hasError) {
        onboarding = {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
        };

        // Reset the steps variables I am using as reference to my onboarding status
        step1 = false;
        step2 = false;
        step3 = false;
        step4 = false;
        step5 = false;
      }
      // Update the user's onboarding status
      await userRef.update({ onboarding });
      DEBUG && logger.info('Onboarding status updated successfully');
    }

    // Get the current status (first false step)
    // If all steps are false, return 1
    // If all steps are true, return 6
    // 6 means that onboarding is completed
    const currentOnboardingStatus = !step1
      ? 1
      : !step2
        ? 2
        : !step3
          ? 3
          : !step4
            ? 4
            : !step5
              ? 5
              : 6;

    DEBUG && logger.info('Current Onboarding Status:', currentOnboardingStatus);

    // Verify if onboaring is completed
    if (currentOnboardingStatus >= 6) {
      DEBUG && logger.info('Onboarding is completed');
      // eslint-disable-next-line no-throw-literal
      throw { code: 403, message: 'Onboarding is completed already!' };
    }

    // Do not progress if progressOnly and
    // current onboarding status is 2 or 3
    if (
      progressOnly &&
      (currentOnboardingStatus === 2 || currentOnboardingStatus === 3)
    ) {
      DEBUG &&
        logger.info('Progress by other function on onboarding status 2 or 3');
      // eslint-disable-next-line no-throw-literal
      throw {
        success: false,
        code: 403,
        message: 'Save form first to progress onboaring status',
        currentOnboardingStatus,
      };
    }

    // Update the current status to true
    onboarding[currentOnboardingStatus] = true;

    // Update the user's onboarding status in Firestore
    await userRef.update({ onboarding });
    DEBUG && logger.info('Onboarding status progressed successfully');

    return {
      success: true,
      message: 'Onboarding status progressed',
    };
  } catch (error) {
    DEBUG && logger.error('Error in progressing Onboarding Status:', error);
    throw error;
  }
}

/**
 * Advances the onboarding status of a user by updating the onboarding object in the user document.
 *
 * @function advanceOnboardingStatus
 *
 * @param {Object} data - The data object passed from the client.
 * @param {string} data.uid - The user ID for which to advance the onboarding status.
 * @param {functions.https.CallableContext} context - The Firebase callable context.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *   @returns {boolean} success - Indicates whether the operation was successful.
 *   @returns {string} message - A message describing the result of the operation.
 *
 * @throws {functions.https.HttpsError} Possible error cases:
 * @throws {string} code - The error code.
 * @throws {string} message - The error message.
 *
 * @example
 * // Usage as an HTTP endpoint
 * // POST request to: function link
 * // Request body:
 * // {
 * //   "data": {
 * //     "uid": "user-id"
 * //   }
 * // }
 *
 * // Example using fetch API:
 * fetch('function link, {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *   },
 *   body: JSON.stringify({
 *     data: {
 *       uid: "user-id"
 *     }
 *   }),
 * })
 * .then(response => response.json())
 * .then(result => console.log(result))
 * .catch(error => console.error('Error:', error));
 */
const advanceOnboardingStatus = functions.https.onCall(
  async (data, context) => {
    // Getting the userId from data
    const { uid } = data;
    DEBUG && logger.log('advance Onboarding Status started, data:', uid);

    // Validate if userId is not null or not a string
    if (!uid || typeof uid !== 'string') {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid uid');
    }
    try {
      // Progress the onboarding status of the user
      const result = await progressOnboardingStatus(uid, true);

      return {
        success: result.success,
        message: result.message,
      };
    } catch (error) {
      DEBUG && logger.error('Error advancing Onboarding Status:', error);
      if (error.code === 400) {
        throw new functions.https.HttpsError('invalid-argument', error.message);
      }
      if (error.code === 403) {
        throw new functions.https.HttpsError('internal', error.message);
      }
      if (error.code === 404) {
        throw new functions.https.HttpsError('internal', error.message);
      }
      throw new functions.https.HttpsError(
        'internal',
        `An unexpected error occurred: ${error.message}`
      );
    }
  }
);

/**
 * Updates user profile information in Firestore except for profile picture.
 *
 * This Cloud Function is triggered via an HTTPS callable request and expects
 * user profile data to be provided in the request payload. The function validates
 * the input data, ensures required fields are present, and updates the user's
 * profile document in the Firestore database.
 * It parses json/string data and therefore cannot be used to upload images to.
 *
 * @function setupUserProfile
 * @async
 *
 * @param {Object} data - The data object containing user profile information.
 * @param {string} data.uid - The unique identifier for the user.
 * @param {string} data.fullName - The full name of the user.
 * @param {string} data.occupation - The occupation of the user.
 * @param {Object} data.socialLinks - The social media links associated with the user.
 * @param {string} data.bio - A short biography of the user.
 *
 * @param {Object} context - The context object containing authentication information.
 *
 * @returns {Object} A success message indicating the profile was updated.
 *
 * @throws {functions.https.HttpsError} 'invalid-argument' If any required fields are missing or invalid.
 * @throws {functions.https.HttpsError} 'internal' If an internal error occurs while updating the profile.
 *
 * @example
 * // Example usage in frontend:
 * const result = await firebase.functions().httpsCallable('setupUserProfile')({
 *   uid: '123',
 *   fullName: 'John Doe',
 *   occupation: 'Software Engineer',
 *   socialLinks: { twitter: 'https://twitter.com/johndoe' },
 *   bio: 'A passionate developer.'
 * });
 * console.log(result.data.message); // "User profile updated successfully"
 */

const setupUserProfile = functions.https.onCall(async (data, context) => {
  try {
    const { uid, fullName, occupation, socialLinks, bio } = data;

    // Validate fields
    if (!uid || !fullName || !occupation || !socialLinks || !bio) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required fields.'
      );
    }

    // Validate fullName
    const nameRegex = /^[a-zA-Z0-9. ]+$/;
    if (!nameRegex.test(fullName)) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Please input a valid full name.'
      );
    }
    // Validate social media links
    if (typeof socialLinks !== 'object' || socialLinks === null) {
      logger.error(
        'Error updating user profile, no social media links provided'
      );
      throw new functions.https.HttpsError(
        'not-found',
        'no social media links provided'
      );
    } else {
      const links = Object.values(socialLinks);
      // Checking that at least one link is filled in, throws an error if keys are provided by values are empty
      const hasAtLeastOneLink = links.some((link) => link.trim() !== '');
      if (!hasAtLeastOneLink) {
        logger.error(
          'Error updating user profile, at least one social media link is required'
        );
        throw new functions.https.HttpsError(
          'internal',
          'no social media links provided'
        );
      }
    }
    // Store user data in Firestore
    const userRef = admin.firestore().collection('users').doc(uid);
    const userDoc = {
      id: uid,
      fullName: fullName,
      occupation: occupation,
      socialLink: socialLinks,
      bio: bio,
    };

    logger.log('Updating user document in Firestore', userDoc);

    await userRef.set(userDoc, { merge: true });
    // Call the Onboarding Status Transition Utility function to advance the status
    const onboardingResult = await progressOnboardingStatus(uid);
    logger.log('User profile updated successfully');
    return {
      success: true,
      newStatus: onboardingResult.message,
      message: 'User profile updated successfully',
    };
  } catch (error) {
    logger.error('Error updating user profile:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Updates user system preferences and advances onboarding status.
 *
 * @function updateUserPreferences
 *
 * @param {Object} data - The data object passed from the client.
 * @param {string} data.userId - The user ID for which to update preferences and advance onboarding.
 * @param {boolean} data.email - Email preference.
 * @param {boolean} data.push - Push notifications preference.
 * @param {boolean} data.reminders - Reminders preference.
 * @param {boolean} data.theme - Theme preference (true for dark, false for light).
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *   @returns {boolean} success - Indicates whether the operation was successful.
 *   @returns {Object} updatedConfig - The updated system configuration object.
 *   @returns {string} message - A message describing the result of the operation.
 *
 * @throws {functions.https.HttpsError} Possible error cases:
 *   @throws {string} code - The error code.
 *   @throws {string} message - The error message.
 *
 * @example
 * // Usage as an HTTP endpoint
 * // POST request to: function link
 * // Request body:
 * // {
 * //   "data": {
 * //     "userId": "user-id",
 * //     "email": true,
 * //     "push": false,
 * //     "reminders": true,
 * //     "theme": false
 * //   }
 * // }
 *
 * // Example using fetch API:
 * fetch('function link', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *   },
 *   body: JSON.stringify({
 *     data: {
 *       userId: "user-id",
 *       email: true,
 *       push: false,
 *       reminders: true,
 *       theme: false
 *     }
 *   }),
 * })
 * .then(response => response.json())
 * .then(result => console.log(result))
 * .catch(error => console.error('Error:', error));
 */
const updateUserPreferences = functions.https.onCall(async (data, context) => {
  const { userId, email, push, reminders, theme } = data;

  DEBUG &&
    logger.log('Update User Preferences function started with data:', data);

  // Validate input data
  if (!userId || typeof userId !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid userId');
  }
  if (
    typeof email !== 'boolean' ||
    typeof push !== 'boolean' ||
    typeof reminders !== 'boolean' ||
    typeof theme !== 'boolean'
  ) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Preferences must be boolean values'
    );
  }

  try {
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'User not found');
    }

    // const user = userDoc.data(); // this can be used in future for further validation of data in user document
    const updatedConfig = {
      email,
      push,
      reminders,
      theme, // true for dark, false for light
    };

    // Update the systemconfig object in Firestore
    await userRef.update({ systemconfig: updatedConfig });

    // Call the Onboarding Status Transition Utility function to advance the status
    const onboardingResult = await progressOnboardingStatus(userId);

    DEBUG &&
      logger.info(
        'User preferences updated and onboarding status advanced successfully.'
      );

    return {
      success: true,
      updatedConfig,
      newStatus: onboardingResult.message,
    };
  } catch (error) {
    DEBUG && logger.error('Error updating user preferences:', error);
    throw new functions.https.HttpsError(
      'internal',
      `An unexpected error occurred: ${error.message}`
    );
  }
});

module.exports = {
  advanceOnboardingStatus,
  progressOnboardingStatus,
  setupUserProfile,
  updateUserPreferences,
};
