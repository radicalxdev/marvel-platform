const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

const seedDatabase = async (data, context) => {
  const markerDoc = await db.collection('markers').doc('seedingDone').get();

  if (markerDoc.exists) {
    console.log('Database has already been seeded.');
    return { result: 'Database has already been seeded. No action taken.' };
  }
  const seedData = require('./seed_data.json');
  try {
    const batch = db.batch();

    Object.values(seedData).forEach((doc) => {
      const docRef = db.collection('tools').doc(doc.id.toString());
      batch.set(docRef, doc);
    });

    await batch.commit();
    await db
      .collection('markers')
      .doc('seedingDone')
      .set({ timestamp: new Date() });

    console.log('Database seeding completed successfully.');

    return { result: 'Database seeding completed successfully.' };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw new functions.https.HttpsError(
      'unknown',
      'Failed to seed database',
      error
    );
  }
};

module.exports = { seedDatabase };
