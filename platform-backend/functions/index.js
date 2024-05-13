const admin = require('firebase-admin');
// const { secrets } = require("firebase-extensions");

admin.initializeApp();

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
  updateEmail: userController.updateEmail,

  /* Users */
  updateProfile: userController.updateProfile,

  /* ReX AI */
  communicator: rexAIController.communicator,
  communicatorV2: rexAIController.communicatorV2,
  communicatorV3: rexAIController.communicatorV3,
  toolCommunicatorV1: rexAIController.toolCommunicatorV1,
  toolCommunicatorV2: rexAIController.toolCommunicatorV2,
  createChatSession: rexAIController.createChatSession,
  getUserChatSessions: rexAIController.getUserChatSessions,

  /* Migration Scripts - For running  */
  ...migrationScripts,
};
