const { https } = require("firebase-functions");
const admin = require("firebase-admin");

const {
  STATUS,
  INTERNAL_DIAMONDS_PERCENTAGE,
  PRIZE_POOL_PERCENTAGE,
} = require("../constants");

/**
 * Enrolls a user in a challenge.
 *
 * @param {Object} data - The data object containing the userId and challengeId.
 * @param {string} data.userId - The ID of the user.
 * @param {string} data.challengeId - The ID of the challenge.
 * @param {Object} context - The context object.
 * @return {Object} The result object containing the status and message.
 */
const startChallenge = https.onCall(async (data, context) => {
  const { userId, challengeId } = data;

  const missionRef = admin
    .firestore()
    .collection("challenges")
    .doc(challengeId);
  const userRef = admin.firestore().collection("users").doc(userId);

  const [missionSnapshot, userSnapshot] = await Promise.all([
    missionRef.get(),
    userRef.get(),
  ]);

  /* Check if the mission and the user exist */
  if (!missionSnapshot.exists || !userSnapshot.exists) {
    throw new https.HttpsError("not-found", "No such mission found");
  }

  const questionsRef = await missionRef
    .collection("internal")
    .doc("tasksQuestions")
    .get();
  if (!questionsRef.exists) {
    throw new https.HttpsError(
      "internal",
      "Challenge docs not setup properly."
    );
  }

  const missionData = missionSnapshot.data();
  const userData = userSnapshot.data();

  /* Check if user is already enrolled */
  const querySnapshot = await admin
    .firestore()
    .collection("enrolledPlayers")
    .where("userId", "==", userId)
    .where("challengeId", "==", challengeId)
    .get();

  if (!querySnapshot.empty) {
    throw new https.HttpsError(
      "failed-precondition",
      "User already enrolled in the mission"
    );
  }

  /* Check if user is already enrolled in a quest within the same group */
  const enrolledChallengeSnapshot = await admin
    .firestore()
    .collection("enrolledPlayers")
    .where("userId", "==", userId)
    .where("challengeGroupId", "==", missionData.challengeGroupId)
    .get();

  if (!enrolledChallengeSnapshot.empty) {
    throw new https.HttpsError(
      "failed-precondition",
      "User already enrolled in a quest within this group"
    );
  }

  /* Check if the mission capacity has been reached or not */
  const currentTotal = missionData.players.total + 1;

  if (currentTotal > missionData.players.capacity) {
    throw new https.HttpsError(
      "failed-precondition",
      "Mission capacity reached, no new registrations possible!"
    );
  }

  const userDiamonds = userData.diamonds;
  const missionEntryFee = missionData.entryFee;

  if (userDiamonds < missionEntryFee) {
    throw new https.HttpsError(
      "failed-precondition",
      "User does not have enough diamonds"
    );
  }

  /* Calculate the prize pool and RadicalX's internal collection */
  const prizePool = Math.round(missionEntryFee * PRIZE_POOL_PERCENTAGE);
  const internalCollection = Math.round(
    missionEntryFee * INTERNAL_DIAMONDS_PERCENTAGE
  );
  const missionPrizePool = missionData.prizePool;

  /* Update the prize pool in the mission document */
  await missionRef.update({
    prizePool: missionPrizePool + prizePool,
    "players.total": missionData.players.total + 1,
  });

  /* Store the amount in RadicalX's internal collection */
  const internalCollectionRef = admin
    .firestore()
    .collection("internal")
    .doc("summary");
  await internalCollectionRef.update({
    diamondsEarned: admin.firestore.FieldValue.increment(internalCollection),
  });

  /* Deduct the entry fee from the user's balance */
  await userRef.update({
    diamonds: admin.firestore.FieldValue.increment(-missionEntryFee),
  });

  /* Creating tasks array and updating basic data */
  const questionsData = questionsRef.data();
  const userTasksArray =
    Object.values(questionsData.tasks)
      .sort((a, b) => a.order - b.order)
      ?.map((task) => ({
        id: task.id,
        score: 0,
        startTime: null,
        endTime: null,
        status: STATUS.NOT_STARTED,
        correct: null,
        numberOfHints: 0,
        numberOfTries: 0,
      })) || [];

  const userPracticeArray =
    missionData.practice?.map((item) => ({
      id: item.id,
      numberOfHints: 0,
      numberOfTries: 0,
      score: 0,
      correct: null,
      order: item.order,
      level: item.level,
      status: STATUS.NOT_STARTED,
      startTime: null,
      endTime: null,
    })) || [];

  /* Create the enrollment object */
  const enrollment = {
    botpressUserId: null,
    endTime: null,
    githubRepo: null,
    challengeId: challengeId,
    startTime: new Date(),
    status: STATUS.NOT_STARTED,
    // tasks: userTasksArray.sort((a, b) => a.order - b.order),
    practice: userPracticeArray.sort((a, b) => a.order - b.order),
    totalScore: 0,
    userId: userId,
  };

  const enrolledPlayerRef = await admin
    .firestore()
    .collection("enrolledPlayers")
    .add(enrollment);
  await enrolledPlayerRef.collection("internal").doc("tasksAnswers").set({
    challengeId,
    tasks: userTasksArray,
    startTime: null,
    endTime: null,
    duration: 0,
    totalScore: 0,
  });
  return {
    status: "success",
    message: "User successfully enrolled in mission",
  };
});

module.exports = {
  startChallenge,
};
