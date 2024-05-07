const admin = require('firebase-admin');
const { https, logger } = require('firebase-functions');

const addCategoryIdToChallenges = https.onCall(async () => {
  logger.log('Migration - addCategoryIdToChallenges - started');
  const challengesDocs = await admin.firestore().collection('challenges').get();

  let docsUpdated = 0;
  await Promise.all(
    challengesDocs.docs.map(async (challengeDoc) => {
      const challengeData = challengeDoc.data();
      const { challengeId, categoryId } = challengeData;

      if (!challengeId || categoryId) return;

      await challengeDoc.ref.update({
        categoryId: challengeId,
        challengeId: null,
      });
      docsUpdated += 1;

      return;
    })
  );

  logger.log(`${docsUpdated} challenge docs updated`);
  logger.log('Migration - addCategoryIdToChallenges - ended');
});

module.exports = {
  addCategoryIdToChallenges,
};
