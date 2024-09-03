const admin = require('firebase-admin');
const { https, logger } = require('firebase-functions');
const DEBUG = process.env.DEBUG;

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Creates a new user document in the Firestore collection "users" with the provided data.
 *
 * @async
 * @function signUpUser
 * @param {Object} data - The data object containing the user's information.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.fullName - The full name of the user.
 * @param {string} data.uid - The unique identifier for the user.
 * @param {Object} context - The context object containing information about the authenticated user.
 * @returns {Promise<Object>} A promise that resolves to an object indicating the success of the operation.
 * @returns {string} return.status - The status of the operation ('success').
 * @returns {string} return.message - A message describing the result of the operation.
 * @throws {https.HttpsError} If any of the required fields (email, fullName, uid) are missing in the data object.
 */
exports.signUpUser = https.onCall(async (data, context) => {
  const { email, fullName, uid } = data;

  // Input validations
  if (!email) {
    throw new https.HttpsError('invalid-argument', 'Email is required.', {
      code: 400,
    });
  }
  if (!isValidEmail(email)) {
    throw new https.HttpsError('invalid-argument', 'Invalid email format.', {
      code: 400,
    });
  }
  if (!uid || typeof uid !== 'string' || uid.trim() === '') {
    throw new https.HttpsError(
      'invalid-argument',
      'UID is required and must be a non-empty string.',
      { code: 400 }
    );
  }
  if (
    !fullName ||
    typeof fullName !== 'string' ||
    fullName.trim().length === 0 ||
    fullName.length > 100
  ) {
    throw new https.HttpsError(
      'invalid-argument',
      'Full name is required, must be a string, and should be between 1 and 100 characters.',
      { code: 400 }
    );
  }

  try {
    const userRef = admin.firestore().collection('users').doc(uid);
    // Create new user document
    const userDoc = {
      id: uid,
      email,
      fullName,
      onboarding: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      },
      systemconfig: {
        email: true,
        push: false,
        reminders: true,
        theme: false,
      },
    };

    await userRef.set(userDoc);
    return {
      status: 'success',
      message: 'User document created successfully',
      user: userDoc,
    };
  } catch (error) {
    // Firebase error handling
    console.error('Error creating user document:', error);
    if (error instanceof https.HttpsError) {
      throw error;
    }
    throw new https.HttpsError('internal', 'Firebase internal error.', {
      code: 500,
    });
  }
});

/**
 * Retrieves user information from the database, including onboarding status.
 *
 * @function getUser
 * @async
 * @param {string} uid - The user ID to retrieve
 *
 * @returns {Promise<void>} - Sends a JSON response with user data or error message
 *
 * @throws {Object} - Returns a JSON object with error details if an error occurs
 *
 * @example
 * // GET http://<your-firebase-project>.cloudfunctions.net/getUser?uid=<userId>

 */
exports.getUser = https.onRequest(async (req, res) => {
  DEBUG && logger.log('getUser function started');

  // Ensure this is a GET request
  if (req.method !== 'GET') {
    res.status(405).json({
      success: false,
      message: 'GET method is required',
    });
    return;
  }

  // Extract uid from query parameters
  const uid = req.query.uid;
  DEBUG && logger.log('getUser uid:', uid);

  // Validate uid
  if (!uid || typeof uid !== 'string') {
    DEBUG && logger.error('Invalid uid:', uid);
    res.status(400).json({
      success: false,
      message: 'Invalid user ID',
    });
    return;
  }

  try {
    // Get User from Firestore Database
    const db = admin.firestore();
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    // Validate if the user exists
    if (!userDoc.exists) {
      DEBUG && logger.error('User not found:', uid);
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Get the user data
    const user = userDoc.data();

    // Check if the user has an onboarding object
    if (!user.onboarding) {
      user.onboarding = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      };
    }

    // Get the current onboarding status
    const currentStatus = !user.onboarding[1]
      ? 1
      : !user.onboarding[2]
        ? 2
        : !user.onboarding[3]
          ? 3
          : !user.onboarding[4]
            ? 4
            : !user.onboarding[5]
              ? 5
              : 6;

    // Update the user object with the current onboarding status
    user.onboarding = currentStatus;

    // Return the user data
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    DEBUG && logger.error('Error in getUser function:', error);

    // For any errors, return a 500 Internal Server Error
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
    });
  }
});
