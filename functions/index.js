const admin = require('firebase-admin');

admin.initializeApp({
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_STORAGE_BUCKET,
});

const userController = require('./controllers/userController');
const kaiAIController = require('./controllers/kaiAIController');
const dbSeedController = require("./controllers/dbSeedController")

/* Migration Scripts */
// const {
//   modifyChallengePlayersData,
// } = require("./migrationScripts/modifyChallengePlayersData");
const migrationScripts = {};

module.exports = {
  /* Authenticaition */
  signUpUser: userController.signUpUser,

  /* Kai AI */
  communicatorV3: kaiAIController.communicatorV3,
  toolCommunicatorV2: kaiAIController.toolCommunicatorV2,
  createChatSession: kaiAIController.createChatSession,

  seedDatabase: dbSeedController.seedDatabase,

  /* Migration Scripts - For running  */
  ...migrationScripts,
};
