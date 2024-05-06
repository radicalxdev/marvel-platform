const admin = require("firebase-admin");
const { https, logger } = require("firebase-functions");

const moveChallengeDetailsToInternal = https.onCall(async () => {
  logger.log("Migration - moveChallengeDetailsToInternal - started");
  const challengesDocs = await admin.firestore().collection("challenges").get();

  let docsAdded = 0;
  await Promise.all(challengesDocs.docs.map(async (challengeDoc) => {
    const challengeData = challengeDoc.data();
    const { details } = challengeData;

    const detailsDoc = await challengeDoc.ref.collection("internal").doc("details").get();

    if (detailsDoc.exists) return;

    if (details) {
      docsAdded += 1;
      await detailsDoc.ref.set({ details });

      return await challengeDoc.ref.update({
        details: null,
      });
    }
  }));

  logger.log(`${docsAdded} details docs added to challenges -> internal`);
  logger.log("Migration - moveChallengeDetailsToInternal - ended");
});

module.exports = {
  moveChallengeDetailsToInternal,
};
