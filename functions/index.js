require('dotenv').config({ path: '../.env' }); // Ensure this is at the top
const admin = require('firebase-admin');

admin.initializeApp();

const userController = require('./controllers/userController');
const marvelAIController = require('./controllers/marvelAIController');
const ToolsController = require('./controllers/ToolsController');
const { seedDatabase } = require('./cloud_db_seed');

seedDatabase();

/* Migration Scripts */
// const {
// } = require("./migrationScripts/modifyChallengePlayersData");
const migrationScripts = {};

module.exports = {
  /* Authenticaition */
  signUpUser: userController.signUpUser,

  /* Marvel AI */
  chat: marvelAIController.chat,
  tool: marvelAIController.tool,
  createChatSession: marvelAIController.createChatSession,

  /* output tools History */
  deleteToolsSession: ToolsController.deleteToolsSession,
  determineToolsSessionState: ToolsController.determineToolsSessionState,

  /* Migration Scripts - For running */
  ...migrationScripts,
};
