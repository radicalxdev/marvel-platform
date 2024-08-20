const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');

const db = admin.firestore();

const seedDatabase = async () => {
  const data = require('./seed_data.json');

  try {
    const global = await db.collection('global').doc('config').get();

    if (global.exists) {
      console.log('Marvel AI is ready to go!');
      return;
    }

    db.collection('global')
      .doc('config')
      .set({ dbSeeded: true, updatedAt: Timestamp.fromMillis(Date.now()) });

    Object.values(data).forEach(async (doc) => {
      await db.collection('tools').doc(doc.id.toString()).set(doc);
      console.log(`Document with ID ${doc.id} added to the Tools collection`);
    });
    console.log(
      'Marvel AI installed successfully to firebase and is ready to go!'
    );
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = { seedDatabase };
