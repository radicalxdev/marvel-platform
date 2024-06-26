const admin = require('firebase-admin');
const functions = require("firebase-functions");
const { Timestamp } = require('firebase-admin/firestore');

// Function to create a new tools history document
const createToolsHistory = functions.https.onCall(async (data, context) => {
    try {
        // Destructure the necessary fields from the incoming data
        const { userId, title, type, content, description } = data;

        // Check if any of the required fields are missing
        if (!userId || !title || !type || !content || !description) {
            throw new functions.https.HttpsError('invalid-argument', 'Missing value');
        }

        // Prepare the data to be stored in Firestore
        const historyData = {
            userId: userId,
            createdAt: Timestamp.fromMillis(Date.now()), // Set the creation timestamp
            updatedAt: Timestamp.fromMillis(Date.now()), // Set the update timestamp
            title: title,
            type: type,
            content: content,
            description: description
        };

        // Add the new document to the 'toolsHistory' collection in Firestore
        const toolsHistoryRef = await admin.firestore().collection('toolsHistory').add(historyData);

        // Return a success response with the new document's ID
        return { success: true, message: 'Document successfully written!', toolId: toolsHistoryRef.id };
    } catch (error) {
        // Log the error and throw an HTTP error if document creation fails
        console.error('Error creating document:', error);
        throw new functions.https.HttpsError('internal', 'Unable to write document');
    }
});

// Function to update an existing tools history document
const updateToolsHistory = functions.https.onCall(async (data, context) => {
    try {
        // Destructure the necessary fields from the incoming data
        const { toolId, userId, newTitle, newType, newContent, newDescription } = data;

        // Check if the toolId or userId fields are missing
        if (!toolId || !userId) {
            throw new functions.https.HttpsError('invalid-argument', 'Missing value');
        }

        // Get the document from Firestore using the provided toolId
        const toolsHistoryDoc = await admin.firestore().collection('toolsHistory').doc(toolId).get();

        // Check if the document exists
        if (!toolsHistoryDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'Document does not exist');
        }

        // Get the document data
        const toolsHistory = toolsHistoryDoc.data();

        // Check if the userId matches the userId of the document owner
        if (toolsHistory.userId !== userId) {
            throw new functions.https.HttpsError('permission-denied', 'User does not have permission to update this document');
        }

        // Prepare the updated data, only including fields that have new values
        const toolsHistoryData = {
            ...(newTitle != null && { title: newTitle }),
            ...(newType != null && { type: newType }),
            ...(newContent != null && { content: newContent }),
            ...(newDescription != null && { description: newDescription }),
            updatedAt: Timestamp.fromMillis(Date.now()), // Update the timestamp
        };

        // Update the document in Firestore with the new data
        await admin.firestore().collection('toolsHistory').doc(toolId).update(toolsHistoryData);

        // Return a success response
        return { success: true, message: 'Document successfully updated!' };
    } catch (error) {
        // Log the error and throw an HTTP error if document update fails
        console.error('Error updating document:', error);
        throw new functions.https.HttpsError('internal', 'Unable to write document');
    }
});

module.exports = {
    createToolsHistory,
    updateToolsHistory
}