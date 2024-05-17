const admin = require('firebase-admin');

const db = admin.firestore();

const seedDatabase = async () => {
  const data = require('./seed_data.json');

  try {
    Object.values(data).forEach(async (doc) => {
      db.collection('markers')
        .doc('seedingDone')
        .set({ timestamp: new Date() });
      await db.collection('tools').doc(doc.id.toString()).set(doc);
      console.log(`Document with ID ${doc.id} added to the Tools collection`);
    });
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = { seedDatabase };
