require('dotenv').config({ path: '../.env' }); // Ensure this is at the top
const admin = require('firebase-admin');

admin.initializeApp();

const userController = require('./controllers/userController');
const kaiAIController = require('./controllers/kaiAIController');
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

  /* Kai AI */
  chat: kaiAIController.chat,
  tool: kaiAIController.tool,
  createChatSession: kaiAIController.createChatSession,

  /* output tools History */
  createToolsSession: ToolsController.createToolsSession,
  updateToolsSession: ToolsController.updateToolsSession,
  deleteToolsSession: ToolsController.deleteToolsSession,

  /* Migration Scripts - For running */
  ...migrationScripts,
};
