const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');

const db = admin.firestore();

const seedDiscoveryLibraries = async () => {
  const discoveryLibrariesData = require('./discoveryLibraries_seed.json');

  try {
    const discoveryLibraries = await db.collection('discoveryLibraries').get();

    if (!discoveryLibraries.empty) {
      console.log('Discovery Libraries is ready to go!');
      return;
    }

    Object.values(discoveryLibrariesData).forEach(async (doc) => {
      await db.collection('discoveryLibraries').doc(doc.id.toString()).set(doc);
      console.log(
        `Document with ID ${doc.id} added to the Discovery Libraries collection`
      );
    });

    console.log('Discovery Libraries data seeded successfully.');
  } catch (error) {
    console.error('Error seeding Discovery Libraries collection:', error);
  }
};

const seedDatabase = async () => {
  const data = require('./seed_data.json');

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
    console.log(
      'Kai AI installed successfully to firebase and is ready to go!'
    );

    await seedDiscoveryLibraries();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = { seedDatabase };
