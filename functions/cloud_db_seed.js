const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
});

const db = admin.firestore();

async function seedDatabase() {
	const data = require("./seed_data.json")

	try {
		for (const key in data) {   
			const doc = data[key];
			await db.collection("tools").doc(doc.id.toString()).set(doc);
			console.log(`Document with ID ${doc.id} added to the Tools collection`);
		}
	} catch (error) {
		console.error('Error seeding database:', error);
	}
}

seedDatabase();
