const admin = require('firebase-admin');
const functions = require('firebase-functions');
const moment = require('moment');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

const db = admin.firestore();

const calculateScore = (
  totalQuestions,
  correctAnswers,
  startTime,
  endTime = new Date()
) => {
  // Score from Correct Answers
  const scorePerQuestion = 100 / totalQuestions;
  const scoreFromAnswers = correctAnswers * scorePerQuestion;
  const actualTimeMs = moment(endTime).diff(startTime);

  // Conversion from minutes to milliseconds for constants
  const twoMins = 2 * 60 * 1000;
  const fifteenMins = 15 * 60 * 1000;
  const maxPenalty = 30;
  const maxExtendedPenalty = 50;

  let timeBasedAdjustment = 0;

  if (actualTimeMs <= fifteenMins) {
    // Quadratic penalty
    const timeOverTwoMins = actualTimeMs - twoMins;
    timeBasedAdjustment =
      (maxPenalty / Math.pow(fifteenMins - twoMins, 2)) *
      Math.pow(timeOverTwoMins, 2);
  } else {
    // Logarithmic penalty post 15 minutes.
    // We use a scaling factor to make the increase extremely slow.
    const scalingFactor = 0.01; // This is a small scaling factor to slow down the penalty increase
    timeBasedAdjustment =
      maxPenalty +
      (maxExtendedPenalty - maxPenalty) *
        scalingFactor *
        Math.log(actualTimeMs - fifteenMins + 1);
  }

  // Ensure score is always at least 1 for all correct answers
  if (correctAnswers === totalQuestions) {
    timeBasedAdjustment = Math.min(scoreFromAnswers - 1, timeBasedAdjustment);
  }

  // Final Score - Subtracting the time-based adjustment from the score from answers
  const finalScore = scoreFromAnswers - timeBasedAdjustment;

  // Ensure the score never goes below 0
  return Math.max(0, finalScore);
};

// For future use
const calculateAllScores = functions.https.onCall(async () => {
  const doc = await db
    .collection('enrolledPlayers')
    .where('status', '==', 'completed')
    .get();
  await Promise.all(
    doc.docs.map(async (doc) => {
      const data = doc.data();
      const totalScore = calculateScore(
        data.tasks.length,
        data.tasks.filter(({ correct }) => correct).length,
        data.startTime,
        data.tasks[data.tasks.length - 1].endTime
      );
      return doc.ref.update({ totalScore });
    })
  );

  return;
});

const fetchSecret = async (secretName) => {
  const [version] = await client.accessSecretVersion({
    name: secretName,
  });
  return version.payload.data.toString('utf8');
};

module.exports = {
  calculateScore,
  calculateAllScores,
  fetchSecret,
};
