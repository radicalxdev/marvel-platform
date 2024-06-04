const admin = require('firebase-admin');
const { https } = require('firebase-functions');
const { HttpsError } = require('firebase-functions/v1/auth');
const { stringToHash } = require('../utils/hashUtil');
const { BOT_TYPE } = require('../constants');

// #region signUp a user
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
      'failed-precondition',
      'Please provide all required fields'
    );
  }

  const userRef = admin.firestore().collection('users').doc(uid);
  const userDoc = {
    id: uid,
    email,
    fullName,
  };
  await userRef.set(userDoc);
  return { status: 'success', message: 'User document created successfully' };
});
// #endregion

// #region get History GET and POST
/**
 * get user's chat history from DB use POST request
 *
 * @param {Object} data - The data object containing the user's unique identifier (uid), session identidier (sid).
 * @throws {HttpsError} If any of the required fields (email, fullName, uid) are missing in the data object.
 * @return {Object} status and the user's history in a list form
 */
const gethistPOST = https.onCall(async (data) => {
  const { uid } = data;
  if (!uid) {
    throw new https.HttpsError(
      'failed-precondition',
      'Please provide all required fields'
    );
  }
  const hists = await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('outputs')
    .get();
  return { status: 'success', data: hists.docs.map((doc) => doc.data()) };
});

/**
 * get user's chat history from DB use GET request
 *
 * @param {Object} req - The data object containing the user's unique identifier (uid), session identidier (sid).
 * @param {Object} res - Return status and the user's history in a list form.
 * @throws {HttpsError} If any of the required fields (email, fullName, uid) are missing in the data object.
 */
const gethistGET = https.onRequest(async (req, res) => {
  if (req.method === 'GET') {
    const { uid } = req.body.data;
    if (!uid) {
      throw new https.HttpsError(
        'failed-precondition',
        'Please provide all required fields'
      );
    }
    const hists = await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('outputs')
      .get();
    res
      .status(200)
      .send({ status: 'success', data: hists.docs.map((doc) => doc.data()) });
  } else {
    // Handle other types of requests
    res.status(405).send('Method Not Allowed');
  }
});

exports.getHist = gethistGET; // or histPOST if want use post to access
// #endregion

// #region setHist
/**
 * Creates a new user chat History document.
 *
 * @param {Object} data - The data object containing the user's unique identifier (uid), session identidier (sid), and list of messages (messages).
 * @throws {HttpsError} If any of the required fields (email, fullName, uid) are missing in the data object.
 * @return {Object} - Return status 200/other.
 */
// if you are here, hey, this is a easter egg. Me BB will stay with CC
exports.setHist = https.onCall(async (data) => {
  const { uid, title, type, content } = data;
  const creationDate = Date.now();
  if (!uid || !title || !type || !content) {
    throw new https.HttpsError(
      'failed-precondition',
      'Please provide all required fields'
    );
  }
  if (type != BOT_TYPE.TOOL) {
    throw new https.HttpsError('invalid-argument', 'type should be tool');
  }
  const id = stringToHash(title + creationDate.toString() + type).toString();
  const histsRef = await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('outputs')
    .doc(id);
  if (!(await histsRef.get()).exists) {
    const outputDoc = {
      id,
      title,
      type,
      creationDate,
      content,
    };
    histsRef.set(outputDoc);
  } else {
    throw new HttpsError(
      'already-exists',
      'such Session already have a History'
    );
  }
  return { status: 'success' };
});
// #endregion

exports.delHist = https.onCall(async (data) => {
  const { uid, oid } = data;
  if (!uid || !oid) {
    throw new https.HttpsError(
      'failed-precondition',
      'Please provide all required fields'
    );
  }
  const histsRef = await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('outputs')
    .doc(oid);
  if ((await histsRef.get()).exists) {
    histsRef.delete();
  } else {
    throw new HttpsError('not-found', 'trying to delete history not exist');
  }
  return { status: 'success' };
});
