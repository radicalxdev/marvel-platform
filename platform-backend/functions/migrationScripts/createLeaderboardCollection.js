const admin = require('firebase-admin');
const { https } = require('firebase-functions');
const moment = require('moment');
const { STATUS } = require('../constants');

const TWENTY_FIVE_MINS = 1500000;

const createLeaderboardCollection = https.onCall(async (data, context) => {
  const challengesDocs = await admin
    .firestore()
    .collection('challenges')
    .where('status', 'in', [STATUS.IN_PROGRESS, STATUS.COMPLETED])
    .get();

  const challengePromises = challengesDocs.docs.map(async (docRef) => {
    const challengeId = docRef.id;
    const enrolledPlayerDocs = await admin
      .firestore()
      .collection('enrolledPlayers')
      .where('challengeId', '==', challengeId)
      .get();

    let players = [];
    await Promise.all(
      enrolledPlayerDocs.docs.map(async (doc) => {
        const enrolledPlayerDoc = doc.data();
        const answersDoc = await doc.ref
          .collection('internal')
          .doc('tasksAnswers')
          .get();
        if (!answersDoc.exists) return;

        const answersData = answersDoc.data();
        const currentTime = new Date();
        if (
          moment(currentTime).diff(
            answersData.startTime?.toDate(),
            'milliseconds'
          ) < TWENTY_FIVE_MINS &&
          answersData.tasks?.find(({ status }) =>
            [STATUS.NOT_STARTED, STATUS.IN_PROGRESS].includes(status)
          )
        ) {
          return;
        }

        let userDoc = await admin
          .firestore()
          .collection('users')
          .doc(enrolledPlayerDoc.userId)
          .get();
        if (!userDoc.exists) return;

        userDoc = userDoc.data();
        players.push({
          id: enrolledPlayerDoc.userId,
          fullName: userDoc.fullName,
          totalScore: answersData.totalScore,
          duration: answersData.duration,
          startTime: answersData.startTime,
          endTime: answersData.endTime,
          avatarId: userDoc.avatarId,
        });
      })
    );

    players = players.sort((a, b) => {
      return b.totalScore - a.totalScore || a.duration - b.duration;
    });

    for (let i = 0; i < players.length; i += 1) {
      players[i].placed = i + 1;
    }

    await admin.firestore().collection('leaderboards').doc(challengeId).set({
      id: challengeId,
      players,
    });
  });

  await Promise.all(challengePromises);
  return 'success';
});

module.exports = {
  createLeaderboardCollection,
};
