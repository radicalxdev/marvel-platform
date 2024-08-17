// File to create a firebase functions for the onboardong workflow

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const busboy1 = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

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
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }
  const busboy = busboy1({ headers: req.headers });
  const tmpdir = os.tmpdir();
  const uid = req.query.uid;
  let uploadData = null;
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const filepath = path.join(tmpdir, filename.toString());
    uploadData = { file: filepath, type: mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('finish', async () => {
    if (!uploadData) {
      return res.status(400).send('No file uploaded');
    }
    const bucket = admin.storage().bucket();
    const storageFilePath = `profileImages/${uid}/${path.basename(uploadData.file)}`;
    await bucket.upload(uploadData.file, {
      destination: storageFilePath,
      metadata: {
        contentType: uploadData.type,
      },
    });

    fs.unlinkSync(uploadData.file);
    const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(storageFilePath)}?alt=media`;
    await admin.firestore().collection('Users').doc(uid).set(
      {
        profileImage: fileUrl,
      },
      { merge: true }
    );
    return res.status(200).json({ fileUrl });
  });
  busboy.end(req.rawBody);
});
