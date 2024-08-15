require('dotenv').config({ path: '../.env' }); // Ensure this is at the top
const admin = require('firebase-admin');

admin.initializeApp();

const userController = require('./controllers/userController');
const kaiAIController = require('./controllers/kaiAIController');
const OnboardingController = require('./controllers/onboardingController');
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

  /* Migration Scripts - For running  */
  ...migrationScripts,

  // Onboarding
  onboardingStep1: OnboardingController.saveStep1,
  onboardingStep2: OnboardingController.saveStep2,
  onboardingStep3: OnboardingController.saveStep3,
  onboardingStep4: OnboardingController.saveStep4,
  onboaridngGetLatestSetp: OnboardingController.getLatestStep,
  uploadProfileImage: OnboardingController.uploadProfileImage,
};
