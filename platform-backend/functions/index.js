const admin = require('firebase-admin');
// const { secrets } = require("firebase-extensions");

admin.initializeApp();

const userController = require('./controllers/userController');
const challengeController = require('./controllers/challengeController');
const playerController = require('./controllers/playerController');
const emailController = require('./controllers/emailController');
const certificateController = require('./controllers/certificatesController');
const rexAIController = require('./controllers/rexAIController');
const paymentsController = require('./controllers/paymentsController');
const squadsController = require('./controllers/squadsController');

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

  /* Challenges */
  enrollUserInChallenge: playerController.startChallenge,
  startChallenge: challengeController.startChallenge,
  stopChallenge: challengeController.stopChallenge,
  getChallengeStatus: challengeController.getChallengeStatus,
  getUserData: challengeController.getUserData,
  challengeUpdate: challengeController.update,
  tasksUpdater: challengeController.tasksUpdater,
  submitTask: challengeController.submitTask,
  submitTaskV2: challengeController.submitTaskV2,
  onTaskAnsUpdate: challengeController.onTaskAnsUpdate,
  updateEnrolledPlayers: challengeController.updateEnrolledPlayers,

  /* Emails */
  emailWelcome: emailController.welcome,
  emailQuestCompletion: emailController.questCompletion,

  /* ReX AI */
  communicator: rexAIController.communicator,
  communicatorV2: rexAIController.communicatorV2,
  createChatSession: rexAIController.createChatSession,
  getUserChatSessions: rexAIController.getUserChatSessions,

  /* Certificate */
  generateCertificate: certificateController.generateChallengeCertificate,

  /* Payments */
  addGemsOnCheckoutSessionCompleted:
    paymentsController.addGemsOnCheckoutSessionCompleted,
  addGemsOnCustomerSubscriptionUpdated:
    paymentsController.addGemsOnCustomerSubscriptionUpdated,
  addNewUserToFreePlan: paymentsController.addNewUserToFreePlan,
  createStripeCustomerForCurrentUsers:
    paymentsController.createStripeCustomerForCurrentUsers,
  downgradeUserToFreePlanOnSubscriptionCancel:
    paymentsController.downgradeUserToFreePlanOnSubscriptionCancel,
  createStripeCustomerOnUserCreated:
    paymentsController.createStripeCustomerOnUserCreated,

  /* Squads */
  sendInvite: squadsController.sendInvite,
  inviteResponse: squadsController.inviteResponse,
  addSquadMember: squadsController.addSquadMember,
  createSquad: squadsController.createSquad,
  updateSquadInfo: squadsController.updateSquadInfo,
  deleteSquadRole: squadsController.deleteSquadRole,
  addSquadRole: squadsController.addSquadRole,
  editSquadRole: squadsController.editSquadRole,
  squadApplication: squadsController.squadApplication,
  applicationResponse: squadsController.applicationResponse,

  /* Migration Scripts - For running  */
  ...migrationScripts,
};
