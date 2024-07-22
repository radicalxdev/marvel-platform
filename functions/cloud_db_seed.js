const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');

const db = admin.firestore();

const convertToTimestamp = (dateStr) => {
  const date = new Date(dateStr);
  return Timestamp.fromDate(date);
};

const seedDatabase = async () => {
  const data = require('./seed_data.json');
  const history_data = require('./seed_history_data.json');

  try {
    const global = await db.collection('global').doc('config').get();

    if (global.exists) {
      console.log('Kai AI is ready to go!');
      return;
    }

    db.collection('global')
      .doc('config')
      .set({ dbSeeded: true, updatedAt: Timestamp.fromMillis(Date.now()) });

    Object.values(data).forEach(async (doc) => {
      await db.collection('tools').doc(doc.id.toString()).set(doc);
      console.log(`Document with ID ${doc.id} added to the Tools collection`);
    });

    // Process and set documents in 'toolsHistory' collection
    for (const [id, doc] of Object.entries(history_data)) {
      if (!id) {
        console.warn(
          'Skipping document with missing ID in toolsHistory collection'
        );
        continue;
      }
      if (doc.createdAt) {
        doc.createdAt = convertToTimestamp(doc.createdAt);
      }
      if (doc.updatedAt) {
        doc.updatedAt = convertToTimestamp(doc.updatedAt);
      }
      await db.collection('toolsHistory').doc(id.toString()).set(doc);
      console.log(
        `Document with ID ${id} added to the toolsHistory collection`
      );
    }

    console.log(
      'Kai AI installed successfully to firebase and is ready to go!'
    );
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = { seedDatabase };
