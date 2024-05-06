const admin = require("firebase-admin");
const { https, logger } = require("firebase-functions");

const DEBUG = process.env.DEBUG;

/**
 * Creates a new user document in the Firestore collection "users" with the provided data.
 *
 * @param {Object} data - The data object containing the user's email, full name, and unique identifier (uid).
 * @param {Object} context - The context object containing information about the authenticated user.
 * @throws {HttpsError} If any of the required fields (email, fullName, uid) are missing in the data object.
 * @return {Object} An object with a status and message property indicating the success of the operation.
 */
exports.signUpUser = https.onCall(async (data, context) => {
  const { email, fullName, uid } = data;

  if (!email || !fullName || !uid) {
    throw new https.HttpsError(
      "failed-precondition",
      "Please provide all required fields"
    );
  }

  const userRef = admin.firestore().collection("users").doc(uid);
  const userDoc = {
    id: uid,
    email,
    fullName,
    githubUsername: null,
    coins: 100,
    diamonds: 300,
  };
  await userRef.set(userDoc);
  return { status: "success", message: "User document created successfully" };
});

/**
 * Updates the email of a user.
 *
 * @param {Object} data - The data object containing the uid and the newEmail.
 * @param {Object} context - The context object.
 * @param {string} data.uid - The user ID.
 * @param {string} data.newEmail - The new email.
 * @throws {https.HttpsError} Throws an error if the required fields are not provided,
 * or if the user is not found.
 * @return {Object} Returns an object with status and message.
 * - status {string} The status of the operation.
 * - message {string} The success message.
 */
exports.updateEmail = https.onCall(async (data, context) => {
  const { uid, newEmail } = data;

  if (!uid || !newEmail) {
    throw new https.HttpsError(
      "failed-precondition",
      "Please provide all required fields"
    );
  }

  const userDoc = await admin.firestore().collection("users").doc(uid).get();

  if (!userDoc.exists) {
    throw new https.HttpsError("not-found", "User not found");
  }

  try {
    await admin.auth().updateUser(uid, { email: newEmail });
  } catch (error) {
    throw new https.HttpsError("not-found", "User not found");
  }

  await userDoc.ref.update({ email: newEmail });
  return { status: "success", message: "User email updated successfully" };
});

/**
 * Updates the user's profile.
 *
 * @param {Object} data - The data object containing the uid and avatarId.
 * @param {Object} context - The context object containing information about the function call.
 * @throws {Error} If uid or profileData is missing.
 * @throws {Error} If the user does not exist.
 * @return {Object} An object with the status and message of the update operation.
 */
exports.updateProfile = https.onCall(async (data, context) => {
  const { profileData } = data;

  if (DEBUG) console.log("updateProfile", profileData);
  if (!profileData) {
    throw new https.HttpsError(
      "failed-precondition",
      "Please provide all required fields"
    );
  }

  // Check if profileData is an object
  if (typeof profileData !== "object") {
    throw new https.HttpsError(
      "invalid-argument",
      "Profile data must be an object"
    );
  }

  // If user attemps to modify diamonds or coins, then throw error
  const updateFieldKeys = Object.keys(profileData);
  if (DEBUG) logger.log("fieldKeys", updateFieldKeys);
  if (["coins", "diamonds"].includes(updateFieldKeys)) {
    logger.log("Cannot update your own diamonds or coins");
    throw new https.HttpsError(
      "permission-denied",
      "Cannot update your own diamonds or coins"
    );
  }

  try {
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .get();

    if (!userDoc.exists)
      throw new https.HttpsError("not-found", "User not found");

    if (DEBUG) logger.log("userDoc", userDoc?.data());

    await userDoc.ref.update({ ...profileData });
    logger.log("User profile updated successfully");
    return { status: "success", message: "User profile updated successfully" };
  } catch (error) {
    logger.log("Failed to update user profile", error);
    throw new https.HttpsError("update-fail", "Failed to update user profile");
  }
});
