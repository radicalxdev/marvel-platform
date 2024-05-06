const admin = require("firebase-admin");
const { https, logger } = require("firebase-functions");
const { DIFFICULTY } = require("../constants");

const addDifficultyToChallenges = https.onCall(async () => {
  logger.log("Migration - addDifficultyToChallenges - started");
  const challengesDocs = await admin.firestore().collection("challenges").get();

  let docsUpdated = 0;
  await Promise.all(challengesDocs.docs.map(async (challengeDoc) => {
    const challengeData = challengeDoc.data();
    const { difficulty } = challengeData;

    if (difficulty) return;

    await challengeDoc.ref.update({
      difficulty: DIFFICULTY.BEGINNER,
    });
    docsUpdated += 1;

    return;
  }));

  logger.log(`${docsUpdated} challenge docs updated`);
  logger.log("Migration - addDifficultyToChallenges - ended");
});

module.exports = {
  addDifficultyToChallenges,
};
