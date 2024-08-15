const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {logger} = functions;
const DEBUG = process.env.DEBUG;

async function progressOnboardingStatus(id, progressOnly = false) {
  DEBUG && logger.log('Advance Onboarding Status method started');

  //Validate if userId is not empty string or null
  if (!id || typeof id !== 'string') {
    DEBUG && logger.error('Invalid user ID:', id);
    throw { code: 400, message: 'Invalid user ID' };
  }

  try {
    // Get User from Firestore Database
    const db = admin.firestore();
    const userRef = db.collection('users').doc(id);
    const userDoc = await userRef.get();

    // Validate if user exists
    if (!userDoc.exists) {
      DEBUG && logger.error('Error in progressing Onboarding Status:', 'User not found');
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
        5: step5 = false 
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
    const hasError = (!step1 && (step2 || step3 || step4 || step5)) ||
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
            5: step5 
        };

        //if there's an error, reset the onboarding status
        if (hasError) {
            onboarding = { 
                1: false, 
                2: false, 
                3: false, 
                4: false, 
                5: false 
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
    const currentOnboardingStatus = 
    !step1 ? 1 : 
    !step2 ? 2 : 
    !step3 ? 3 : 
    !step4 ? 4 : 
    !step5 ? 5 : 6;

    DEBUG && logger.info('Current Onboarding Status:', currentOnboardingStatus);

    // Verify if onboaring is completed
    if (currentOnboardingStatus >= 6) {
        DEBUG && logger.info('Onboarding is completed');
        throw { code: 403, message: 'Onboarding is completed already!' };
    }

    // Do not progress if progressOnly and
    // current onboarding status is 2 or 3
    if (progressOnly && 
        (currentOnboardingStatus === 2 ||
        currentOnboardingStatus === 3)) {
            DEBUG && logger.info('Progress by other function on onboarding status 2 or 3');
            throw {
                success: false, 
                code: 403, 
                message: 'Save form first to progress onboaring status',
                currentOnboardingStatus
        };
    }

    // Update the current status to true
    onboarding[currentOnboardingStatus] = true;

    // Update the user's onboarding status in Firestore
    await userRef.update({ onboarding });
    DEBUG && logger.info('Onboarding status progressed successfully');

    return {
        success: true,
        message: 'Onboarding status progressed'
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
const advanceOnboardingStatus = functions.https.onCall(async (data, context) => {
  // Getting the userId from data
  const {uid} = data;
  DEBUG && logger.log('advance Onboarding Status started, data:', uid);

  // Validate if userId is not null or not a string
  if (!uid || typeof uid !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid uid');
  }
  try {
    // Progress the onboarding status of the user
    const result = await progressOnboardingStatus(uid, true);

    return { 
      success : result.success,
      message: result.message
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
    throw new functions.https.HttpsError('internal', `An unexpected error occurred: ${error.message}`);
  }
});

module.exports = {
    advanceOnboardingStatus,
    progressOnboardingStatus 
};