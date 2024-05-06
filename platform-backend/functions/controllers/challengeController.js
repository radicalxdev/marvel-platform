const admin = require("firebase-admin");
const { firestore, https, logger, pubsub } = require("firebase-functions");
const { onCall } = require("firebase-functions/v2/https");
const moment = require("moment");

const { STATUS } = require("../constants");

const ArrayUtil = require("../utils/ArrayUtil");

const db = admin.firestore();

const TWENTY_FIVE_MINS = 1500000;

/**
 * Starts a challenge every 5 minutes.
 *
 * @return {undefined} No return value.
 */
const startChallenge = pubsub.schedule("every 5 minutes").onRun(async () => {
  try {
    const currentTime = new Date();

    /* Get challenges that should be started */
    const challengeRef = await db
      .collection("challenges")
      .where("startTime", "<=", currentTime)
      .where("status", "==", STATUS.NOT_STARTED)
      .get();

    if (challengeRef.empty) return;

    const challenges = ArrayUtil.firebaseDocsToArray(challengeRef);

    await Promise.all(
      challenges.map(async (challenge) => {
        await challenge.ref.update({ status: STATUS.IN_PROGRESS });
        await db.collection("leaderboards").doc(challenge.id).set({
          id: challenge.id,
          players: [],
        });
      })
    );

    {
      /*
      Notify the users that the challenge has started.
      ...
    */
    }
  } catch (error) {
    logger.error(error);
  }
});

/**
 * Stop the challenge and update the status of completed challenges.
 *
 * @return {undefined} - This function does not return a value.
 */
const stopChallenge = pubsub.schedule("every 5 minutes").onRun(async () => {
  try {
    const currentTime = new Date();

    /* Get challenges that have ended */
    const challengesRef = await db
      .collection("challenges")
      .where("endTime", "<=", currentTime)
      .where("status", "==", STATUS.IN_PROGRESS)
      .get();

    if (challengesRef.empty) {
      logger.log("No challenges to stop found");
      return;
    }

    const challenges = ArrayUtil.firebaseDocsToArray(challengesRef?.docs);

    if (process.env.DEBUG) logger.log("Challenges: ", challenges);

    /* For all the challenges update the players */
    await Promise.all(
      challenges.map(async (challenge) => {
        // Set challenge to completed
        await challenge.ref.update({ status: STATUS.COMPLETED });

        // If challenge is not a quest, return
        if (process.env.DEBUG) logger.log("type", challenge.type);

        // Get enrolled players
        const enrolledPlayersRef = await db
          .collection("enrolledPlayers")
          .where("challengeId", "==", challenge.id)
          .get();

        // If no enrolled players for the quest, return
        if (enrolledPlayersRef.empty) {
          logger.log(
            `No enrolled players found for ${challenge.name} challenge, id : ${challenge.id}`
          );
          return;
        }

        const enrolledPlayers = ArrayUtil.firebaseDocsToArray(
          enrolledPlayersRef?.docs
        );

        // If challenge is not a quest, set endTime and status to completed then return
        if (challenge.type !== "quest") {
          await Promise.all(
            enrolledPlayers.map(async (player) => {
              const { ref } = player;
              await ref.update({
                status: STATUS.COMPLETED,
                endTime: currentTime,
              });
            })
          );
          logger.log(
            `Stopped ${challenge.name} challenge, id : ${challenge.id}`
          );
          return;
        }

        // Update the status of the enrolled players
        await Promise.all(
          enrolledPlayers.map(async (player) => {
            const {
              ref: enrolledPlayerDocRef,
              endTime: playerEndTime,
              userId,
              challengeId,
            } = player;
            let isTasksCompleted = true;

            /* Check if all tasks are completed */
            const answerDocRef = await enrolledPlayerDocRef
              .collection("internal")
              .doc("tasksAnswers")
              .get();

            /* If answer doc not found, return */
            if (!answerDocRef.exists) {
              await ref.update({ status: STATUS.INCOMPLETE });
              logger.log("Assessment doc not found");
              return;
            }

            process.env.DEBUG &&
              logger.log("answerDocRef", answerDocRef?.data());

            const { tasks, endTime, duration } = answerDocRef?.data();

            // Calculate total score, if not set
            const totalScore =
              tasks.filter(({ correct }) => correct).length *
              (100 / tasks.length);

            tasks?.forEach(({ status }) => {
              if (status !== STATUS.COMPLETED) {
                isTasksCompleted = false;
              }
            });

            if (!endTime) {
              await answerDocRef?.ref.update({
                totalScore,
                endTime: currentTime,
              });
              process.env.DEBUG &&
                logger.log(
                  `Updated tasksAnswers doc totalScore & endTime for enrolled player, userId: ${userId}, challengeId: ${challengeId}`
                );
            }

            await enrolledPlayerDocRef.update({
              status: isTasksCompleted ? STATUS.COMPLETED : STATUS.INCOMPLETE,
              endTime: playerEndTime || currentTime,
              totalScore,
              duration,
            });
            process.env.DEBUG &&
              logger.log(
                `Updated enrolled player doc totalScore, status, userId: ${userId}, challengeId: ${challengeId}`
              );
          })
        );

        /* Distribute prize to winner */
        const winner = await db
          .collectionGroup("internal")
          .where("challengeId", "==", challenge?.id)
          .where("totalScore", ">", 0)
          .orderBy("totalScore", "desc")
          .orderBy("duration", "asc")
          .limit(1)
          .get();

        if (winner.empty) {
          logger.log(
            `No winner found for ${challenge.name} challenge, id : ${challenge.id}`
          );
          return;
        }

        const transformWinnerDoc = ArrayUtil.firebaseDocsToArray(
          winner?.docs
        )?.[0];

        process.env.DEBUG &&
          logger.log("transformWinnerDoc", transformWinnerDoc);

        const winnerEnrolledPlayerDoc =
          await transformWinnerDoc?.ref.parent.parent?.get();

        const { userId } = winnerEnrolledPlayerDoc?.data();

        process.env.DEBUG && logger.log("winner userId", userId);

        await db
          .collection("users")
          .doc(userId)
          .update({
            coins: admin.firestore.FieldValue.increment(challenge.prizePool),
          });
        logger.log(
          `Distributed prize ${challenge.prizePool} to winner for ${challenge.name} challenge, id : ${challenge.id}, userId: ${userId}`
        );
        return;
      })
    );

    {
      /*
      Notify the users that the challenge has ended.
      ...
    */
    }
  } catch (error) {
    logger.error(error);
  }
});

/**
 * A function that updates a user's assessments tasks.
 *
 * @param {Object} data - The data object containing the challengeId, journeyId, and userId.
 * @param {Object} context - The context object containing information about the request context.
 * @throws {HttpsError} Throws an error if the user enrollment document or assessment document is not found.
 * @return {Object} Returns an object with the updated status, message, endTime, duration, and totalScore.
 */
const tasksUpdater = https.onCall(async (data, context) => {
  const currentTime = new Date();
  const { challengeId, journeyId, userId } = data;

  /* Get enrolled player */
  const enrolledPlayerQuery = await db
    .collection("enrolledPlayers")
    .where("challengeId", "==", challengeId)
    .where("journeyId", "==", journeyId)
    .where("userId", "==", userId)
    .get();

  if (enrolledPlayerQuery.empty) {
    throw new https.HttpsError(
      "not-found",
      "User enrollement document not found"
    );
  }

  const answersDoc = await enrolledPlayerQuery.docs[0].ref
    .collection("internal")
    .doc("tasksAnswers")
    .get();

  if (!answersDoc.exists) {
    throw new https.HttpsError(
      "not-found",
      "User assessment document not found"
    );
  }

  const answersData = answersDoc.data();

  if (answersData.endTime) {
    return { status: "aborted", message: "Endtime already exists" };
  }

  if (!answersData.startTime) {
    answersData.tasks[0].status = STATUS.IN_PROGRESS;
    answersData.tasks[0].startTime = currentTime;
    return answersDoc.ref.update({
      startTime: currentTime,
      endTime: moment(currentTime).add(25, "minutes"),
      duration: TWENTY_FIVE_MINS,
      tasks: answersData.tasks,
    });
  }

  const totalScore =
    answersData.tasks.filter(({ correct }) => correct).length *
    (100 / answersData.tasks.length);

  return answersDoc.ref.update({
    endTime: currentTime,
    duration: moment(currentTime).diff(answersData.startTime),
    totalScore,
  });
});

/**
 * Submits a task for a challenge.
 *
 * @param {Object} data - The data object containing the challengeId,journeyId, userId, and response.
 * @throws {HttpsError} If the user enrollment document is not found, the challenge document is not found, the internal document is not found, the user assessment document is not found, or the time limit is exceeded.
 * @return {Promise} A promise that resolves with the updated tasks, endTime, duration, and totalScore.
 */
const submitTask = async (data) => {
  const currentTime = new Date();
  const { challengeId, journeyId, userId, response } = data;

  /* Get enrolled player */
  const enrolledPlayerQuery = await db
    .collection("enrolledPlayers")
    .where("challengeId", "==", challengeId)
    .where("journeyId", "==", journeyId)
    .where("userId", "==", userId)
    .get();

  if (enrolledPlayerQuery.empty) {
    throw new https.HttpsError(
      "not-found",
      "User enrollement document not found"
    );
  }

  /* Get challenge */
  const challengeQuery = await db
    .collection("challenges")
    .doc(challengeId)
    .get();

  if (!challengeQuery.exists) {
    throw new https.HttpsError("not-found", "Challenge document not found");
  }

  /* Get challenge solutions */
  const challengeSoltuionQuery = await challengeQuery.ref
    .collection("internal")
    .doc("tasksSolutions")
    .get();

  if (!challengeSoltuionQuery.exists) {
    throw new https.HttpsError("not-found", "Internal document not found");
  }

  const challengeSoltuions = challengeSoltuionQuery.data();
  const answersDoc = await enrolledPlayerQuery.docs[0].ref
    .collection("internal")
    .doc("tasksAnswers")
    .get();

  if (!answersDoc.exists) {
    throw new https.HttpsError(
      "not-found",
      "User assessment document not found"
    );
  }

  const answersData = answersDoc.data();
  const duration = moment(currentTime).diff(answersData.startTime.toDate());

  if (duration > TWENTY_FIVE_MINS) {
    throw new https.HttpsError("aborted", "Time limit exceeded");
  }

  const tasks = [...answersData.tasks];
  let isCorrect = false;

  const currentTaskIndex = tasks.findIndex(
    ({ status }) => status === STATUS.IN_PROGRESS
  );
  const currentTask = tasks[currentTaskIndex];

  if (response === challengeSoltuions.tasks[currentTask.id].solution) {
    isCorrect = true;
  }

  currentTask.correct = isCorrect;
  currentTask.endTime = currentTime;
  currentTask.status = STATUS.COMPLETED;

  tasks[currentTaskIndex] = currentTask;

  // check if other tasks exist
  const isLastTask = tasks.length - 1 <= currentTaskIndex;
  if (!isLastTask) {
    tasks[currentTaskIndex + 1] = {
      ...tasks[currentTaskIndex + 1],
      status: STATUS.IN_PROGRESS,
      startTime: currentTime,
    };
  }

  const totalScore =
    tasks.filter(({ correct }) => correct).length *
    (100 / answersData.tasks.length);

  return answersDoc.ref.update({
    tasks,
    ...(isLastTask ? { endTime: currentTime } : {}),
    duration,
    totalScore,
  });
};

/**
 * Executes a callback function whenever the "tasksAnswers" collection is updated in the "enrolledPlayers" collection in Firestore.
 * The function determines if the user's assessment time is up and if so, updates the user's enrolledPlayer document and adds the user to the leaderboard.
 *
 * @param {Change} change - The change object containing the before and after data of the document.
 * @param {Context} context - The context object containing information about the event.
 * @return {Promise<void>} A promise that resolves when the function is complete.
 */
const onTaskAnsUpdate = firestore
  .document("enrolledPlayers/{enrolledPlayerDocId}/internal/tasksAnswers")
  .onUpdate(async (change, context) => {
    const currentTime = new Date();
    const { challengeId, duration, endTime, startTime, tasks, totalScore } =
      change.after.data();

    const enrolledPlayerDoc = await change.after.ref.parent.parent.get();
    const { userId } = enrolledPlayerDoc.data();

    logger.log({
      challengeId,
      duration,
      endTime,
      startTime,
      tasks,
      totalScore,
      userId,
      actualDuration: moment(currentTime).diff(
        startTime?.toDate(),
        "milliseconds"
      ),
    });

    /* check if challenge is in progress */
    if (
      moment(currentTime).diff(startTime?.toDate(), "milliseconds") <
        TWENTY_FIVE_MINS &&
      tasks?.find(({ status }) =>
        [STATUS.NOT_STARTED, STATUS.IN_PROGRESS].includes(status)
      )
    ) {
      return;
    }

    /* Update enrolled player doc */
    await enrolledPlayerDoc.ref.update({
      status: STATUS.COMPLETED,
      endTime: currentTime,
    });

    /* get loaderboard */
    const leaderboardDoc = await db
      .collection("leaderboards")
      .doc(challengeId)
      .get();

    if (!leaderboardDoc.exists) {
      throw new https.HttpsError(
        "not-found",
        `Leaderboard document ${challengeId} not found`
      );
    }

    const leaderboardData = leaderboardDoc.data();
    let players = [...leaderboardData.players];

    if (players.find(({ id }) => id === userId)) {
      throw new https.HttpsError(
        "aborted",
        `User ${userId} already exists in leaderboard for challenge ${challengeId}`
      );
    }

    /* get user doc */
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      throw new https.HttpsError("not-found", `User ${userId} not found`);
    }
    const userData = userDoc.data();

    players.push({
      id: userId,
      fullName: userData?.fullName,
      avatarId: userData?.avatarId || "",
      totalScore,
      duration,
      startTime,
      endTime,
      title: null,
    });

    players = players.sort((a, b) => {
      return b.totalScore - a.totalScore || a.duration - b.duration;
    });

    for (let i = 0; i < players.length; i += 1) {
      players[i].placed = i + 1;
    }

    leaderboardDoc.ref.update({ players });
  });

/**
 * This function runs every 5 minutes and updates the enrolled player's document with the current time and sets the status as completed.
 *
 *
 * @return {Promise<void>} A promise that resolves once the update is complete.
 */
const updateEnrolledPlayers = pubsub
  .schedule("every 5 minutes")
  .onRun(async () => {
    const currentTime = new Date();
    const enrolledPlayers = await db
      .collection("enrolledPlayers")
      .where("status", "==", STATUS.IN_PROGRESS)
      .get();

    if (enrolledPlayers.empty) {
      return;
    }

    await Promise.all(
      enrolledPlayers.docs.map(async (player) => {
        const tasksAnswers = await player.ref
          .collection("internal")
          .doc("tasksAnswers")
          .get();
        if (!tasksAnswers.exists) return;

        const { tasks = [], startTime } = tasksAnswers.data();

        /* check if challenge is in progress */
        if (
          moment(currentTime).diff(startTime?.toDate(), "milliseconds") <
            TWENTY_FIVE_MINS &&
          tasks?.find(({ status }) =>
            [STATUS.NOT_STARTED, STATUS.IN_PROGRESS].includes(status)
          )
        ) {
          return;
        }

        return player.ref.update({
          status: STATUS.COMPLETED,
          endTime: currentTime,
        });
      })
    );
  });

module.exports = {
  startChallenge,
  stopChallenge,
  tasksUpdater,
  submitTask: https.onCall(submitTask),
  submitTaskV2: onCall((request) => submitTask(request.data)),
  onTaskAnsUpdate,
  updateEnrolledPlayers,
};
