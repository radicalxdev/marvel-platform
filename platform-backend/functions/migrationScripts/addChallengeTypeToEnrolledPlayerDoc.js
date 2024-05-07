const admin = require('firebase-admin');
const { https, logger } = require('firebase-functions');
const { firebaseDocsToArray } = require('../utils/ArrayUtil');

const addChallengeTypeToEnrolledPlayerDoc = https.onCall(async () => {
  logger.log('Migration - addChallengeTypeToEnrolledPlayerDoc - started');
  const challengesDocs = await admin.firestore().collection('challenges').get();
  const enrolledPlayerDocs = await admin
    .firestore()
    .collection('enrolledPlayers')
    .get();

  // If no challenges or enrolled players, return
  if (challengesDocs.empty || enrolledPlayerDocs.empty) {
    logger.log('Migration - addChallengeTypeToEnrolledPlayerDoc - ended');
    return;
  }

  const challenges = firebaseDocsToArray(challengesDocs);
  const enrolledPlayers = firebaseDocsToArray(enrolledPlayerDocs);

  let docsUpdated = 0;
  await Promise.all(
    enrolledPlayers?.map(async (enrolledPlayer) => {
      const enrolledPlayerData = enrolledPlayer.data();
      const { challengeId } = enrolledPlayerData;

      const challengeType = challenges?.find(
        (challenge) => challenge.id === challengeId
      )?.type;

      if (!challengeType) return;

      await enrolledPlayer.ref.update({
        challengeType,
      });
      docsUpdated += 1;

      return;
    })
  );

  logger.log(`${docsUpdated} challenge docs updated`);
  logger.log('Migration - addChallengeTypeToEnrolledPlayerDoc - ended');
});

module.exports = {
  addChallengeTypeToEnrolledPlayerDoc,
};
