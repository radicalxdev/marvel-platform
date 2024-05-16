const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp({
	projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID
});

const db = admin.firestore();

db.settings({
	host: "localhost:8080",
	ssl: false
});

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
