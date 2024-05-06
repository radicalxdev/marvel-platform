const admin = require("firebase-admin");
const { https, logger } = require("firebase-functions");

/**
 * Adds gems to a user's account.
 * This function adds gems to a user's account, either for all users or for the specified user.
 *
 * @param {Object} gems - The number of gems to add.
 * @param {string} userId - The ID of the user to add gems to (optional).
 * @param {Object} context - The context object provided by the Firebase Callable Function.
 * @return {Promise<void>} A Promise that resolves when the gems are added.
 */
const addGems = https.onCall(async ({ gems, userId }, context) => {
  logger.log(`Migration - add ${gems} gems - started`);

  // Check if gems parameter is provided
  if (!gems) return logger.log("Gems parameter required");

  let docsToUpdate;

  // Check if userId is provided
  if (userId) {
    // Fetch the user document with the specified userId
    docsToUpdate = await admin
      .firestore()
      .collection("users")
      .where("id", "==", userId)
      .get();
  } else {
    // If no userId is specified, Fetch all user documents
    docsToUpdate = await admin.firestore().collection("users").get();
  }

  let docsUpdated = 0;

  // Update gems for each user document asynchronously
  await Promise.all(
    docsToUpdate.docs.map(async (doc) => {
      const userData = doc.data();
      const { diamonds } = userData;

      // Update diamonds field with the addition of gems value
      await doc.ref
        .update({
          diamonds: diamonds + gems,
        })
        .catch((error) => {
          logger.error(error);
        });

      docsUpdated += 1;
      return;
    })
  );

  logger.log(`${docsUpdated} challenge docs updated`);
  logger.log("Migration - addGems - ended");
});

module.exports = {
  addGems,
};
