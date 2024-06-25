const admin = require('firebase-admin');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { logger, https } = require('firebase-functions/v1');
const DEBUG = process.env.DEBUG;


exports.createOutput = functions.https.onCall((data, context) => {
    const {userId, toolId, createdDate, title, type,  content, questions} = data;
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    if (!userId || !toolId || !createdDate || !title || !type || !content || questions) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    return admin.firestore().collection('toolsHistory').add({
        userId,
        toolId,
        creationDate:admin.firestore.Timestamp.fromDate(new Date(creationDate)),
        title,
        type,
        content,
        questions
    });
});
    
