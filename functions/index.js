require('dotenv').config({ path: '../.env' }); // Ensure this is at the top
const admin = require('firebase-admin');

const serviceAccount = require('./cloud_IAM_Key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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

  /* output tools history */
  createToolsHistory: ToolsController.createToolsHistory,
  updateToolsHistory: ToolsController.updateToolsHistory,
  deleteToolsHistory: ToolsController.deleteToolsHistory,
  retrieveToolsHistory: ToolsController.retrieveToolsHistory,

  /* Migration Scripts - For running */
  ...migrationScripts,
};
