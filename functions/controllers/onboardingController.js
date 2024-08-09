// File to create a firebase functions for the onboardong workflow

const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.saveStep1 = functions.https.onRequest(async (req, res) => {
  const { uid } = req.body;

  try {
    await admin.firestore().collection('Users').doc(uid).set(
      {
        onboardingStepCompleted: 1,
      },
      { merge: true }
    );

    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

exports.saveStep2 = functions.https.onRequest(async (req, res) => {
  const {
    uid,
    fullName,
    occupation,
    facebookUrl,
    linkedInUrl,
    xUrl,
    profileImage,
    bio,
  } = req.body;

  try {
    await admin.firestore().collection('Users').doc(uid).set(
      {
        fullName,
        occupation,
        facebookUrl,
        linkedInUrl,
        xUrl,
        profileImage,
        bio,
        onboardingStepCompleted: 2,
      },
      { merge: true }
    );

    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

exports.saveStep3 = functions.https.onRequest(async (req, res) => {
  const { uid, emailNotification, pushNotification, reminder, theme } =
    req.body;

  try {
    await admin.firestore().collection('Users').doc(uid).set(
      {
        emailNotification,
        pushNotification,
        reminder,
        theme,
        onboardingStepCompleted: 3,
      },
      { merge: true }
    );

    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

exports.saveStep4 = functions.https.onRequest(async (req, res) => {
  const { uid } = req.body;

  try {
    await admin.firestore().collection('Users').doc(uid).set(
      {
        onboardingStepCompleted: 4,
      },
      { merge: true }
    );

    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

exports.getLatestStep = functions.https.onRequest(async (req, res) => {
  const { uid } = req.query;

  try {
    const userDoc = await admin.firestore().collection('Users').doc(uid).get();
    if (!userDoc.exists) {
      res.status(404).send({ success: false, message: 'User not found' });
    } else {
      res.status(200).send({
        success: true,
        onboardingStepCompleted: userDoc.data().onboardingStepCompleted,
        data: userDoc.data(),
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

exports.uploadProfileImage = functions.https.onRequest(async (req, res) => {
  // Implement file upload logic here, possibly using Firebase Storage
});
