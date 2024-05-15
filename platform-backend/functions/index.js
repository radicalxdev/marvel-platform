const admin = require('firebase-admin');
const { SERVICE_FILE } = require('./config');

const GOOGLE_APPLICATION_CREDENTIALS = JSON.parse(SERVICE_FILE);
const FIREBASE_CONFIG = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS),
  storageBucket: FIREBASE_CONFIG.storageBucket,
});

const userController = require('./controllers/userController');
const rexAIController = require('./controllers/rexAIController');

/* Migration Scripts */
// const {
//   modifyChallengePlayersData,
// } = require("./migrationScripts/modifyChallengePlayersData");
const migrationScripts = {};

module.exports = {
  /* Authenticaition */
  signUpUser: userController.signUpUser,

  /* Kai AI */
  communicatorV3: rexAIController.communicatorV3,
  toolCommunicatorV2: rexAIController.toolCommunicatorV2,
  createChatSession: rexAIController.createChatSession,

  /* Migration Scripts - For running  */
  ...migrationScripts,
};
