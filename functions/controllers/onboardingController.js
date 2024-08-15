// File to create a firebase functions for the onboardong workflow

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const busboy = require('busboy');

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
  const storage = new Storage();
  const busboyInstance = busboy({ headers: req.headers });

  let fileBuffer = Buffer.alloc(0);
  let uid = '';
  let fileName = '';
  let contentType = '';

  busboyInstance.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (fieldname === 'file') {
      fileName = filename;
      contentType = mimetype;

      file.on('data', (data) => {
        fileBuffer = Buffer.concat([fileBuffer, data]);
      });

      file.on('end', async () => {
        try {
          const bucket = storage.bucket();
          const fileUpload = bucket.file(`profileImages/${uid}/${fileName}`);

          const writeStream = fileUpload.createWriteStream({
            metadata: {
              contentType,
            },
          });

          writeStream.end(fileBuffer);

          writeStream.on('finish', async () => {
            const [metadata] = await fileUpload.getMetadata();
            const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${metadata.bucket}/o/${encodeURIComponent(metadata.name)}?alt=media&token=${metadata.metadata.firebaseStorageDownloadTokens}`;

            await admin.firestore().collection('Users').doc(uid).set(
              {
                profileImage: downloadURL,
              },
              { merge: true }
            );

            res.status(200).send({ success: true, downloadURL });
          });

          writeStream.on('error', (error) => {
            res.status(500).send({ success: false, error: error.message });
          });
        } catch (error) {
          res.status(500).send({ success: false, error: error.message });
        }
      });
    }
  });

  busboyInstance.on('field', (fieldname, value) => {
    if (fieldname === 'uid') {
      uid = value;
    }
  });

  busboyInstance.on('finish', () => {
    if (!uid || !fileBuffer.length) {
      res
        .status(400)
        .send({ success: false, message: 'File and UID are required' });
    }
  });

  req.pipe(busboyInstance);
});
