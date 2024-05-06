const admin = require("firebase-admin");
const { https, logger } = require("firebase-functions");
const { firebaseDocsToArray } = require("../utils/ArrayUtil");

/**
 * Modify challenge players data.
 * This function realigns the players property of the challenge docs with the the number of enrolled players for each challenge.
 *
 * @param {object} type - The type of the challenge.
 * @param {number} capacity - The capacity of players allowed on the challenge.
 * @param {object} context - The context object.
 * @return {Promise<void>} A promise that resolves when the function is complete.
 */
const modifyChallengePlayersData = () =>
  https.onCall(async ({ type, capacity }, context) => {
    // Log the start of the migration process
    logger.log(`Migration - modify ${type} challenges  - started`);

    // Check if type or capacity is missing
    if (!type || !capacity) return logger.log("Missing parameters");

    // Fetch challenge documents with the specified type
    const challengeDocs = await admin
      .firestore()
      .collection("challenges")
      .where("type", "==", type)
      .get();

    // Fetch enrolled players documents
    const enrolledPlayersDocs = await admin
      .firestore()
      .collection("enrolledPlayers")
      .get();

    // Check if no challenges are found
    if (challengeDocs.empty) return logger.log("No challenges  found");

    // Convert Firestore document snapshots to array of JavaScript objects
    const challenges = firebaseDocsToArray(challengeDocs);
    const enrolledPlayers = firebaseDocsToArray(enrolledPlayersDocs);

    let docsUpdated = 0;
    // Iterate over each challenge document
    await Promise.all(
      challenges.map(async (doc) => {
        const { id } = doc;

        // Count the number of players currently enrolled in the challenge
        const numOfCurrentPlayers = enrolledPlayers?.filter(
          (enrolledDoc) => enrolledDoc.challengeId === id
        ).length;

        // Update the players field of the challenge document
        await doc.ref
          .update({
            players: {
              capacity,
              total: numOfCurrentPlayers || 0,
            },
          })
          .catch((err) => {
            logger.error(err);
          });
        docsUpdated += 1;
        return;
      })
    );

    // Log the number of challenge documents updated
    logger.log(`${docsUpdated} challenge docs updated`);
    // Log the end of the migration process
    logger.log("Migration - modifyChallengePlayersData - ended");
  });

module.exports = {
  modifyChallengePlayersData,
};
