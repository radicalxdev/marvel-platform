const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');

// Function to create a new tools history document
const createToolsHistory = onCall(async (props) => {
  try {
    // Destructure the necessary fields from the incoming data
    const { toolId, userId, response } = props.data;

    // Check if any of the required fields are missing
    if (!toolId || !userId || !response) {
      throw new HttpsError('invalid-argument', 'Missing value');
    }

    // Prepare the data to be stored in Firestore
    const historyData = {
      toolId: toolId,
      userId: userId,
      createdAt: Timestamp.fromMillis(Date.now()), // Set the creation timestamp
      updatedAt: Timestamp.fromMillis(Date.now()), // Set the update timestamp
      response: response,
    };

    // Add the new document to the 'toolsHistory' collection in Firestore
    const toolsHistoryRef = await admin
      .firestore()
      .collection('toolsHistory')
      .add(historyData);

    // Return a success response with the new document's ID
    return {
      success: true,
      message: 'Document successfully written!',
      toolId: toolsHistoryRef.id,
    };
  } catch (error) {
    // Log the error and throw an HTTP error if document creation fails
    console.error('Error creating document:', error);
    throw new HttpsError('internal', 'Unable to write document');
  }
});

// Function to update an existing tools history document
const updateToolsHistory = onCall(async (props) => {
  try {
    // Destructure the necessary fields from the incoming data
    const { toolId, userId, newResponse } = props.data;

    // Check if the toolId or userId fields are missing
    if (!toolId || !userId) {
      throw new HttpsError('invalid-argument', 'Missing value');
    }

    // Get the document from Firestore using the provided toolId
    const toolsHistoryDoc = await admin
      .firestore()
      .collection('toolsHistory')
      .doc(toolId)
      .get();

    // Check if the document exists
    if (!toolsHistoryDoc.exists) {
      throw new HttpsError('not-found', 'Document does not exist');
    }

    // Get the document data
    const toolsHistory = toolsHistoryDoc.data();

    // Check if the userId matches the userId of the document owner
    if (toolsHistory.userId !== userId) {
      throw new HttpsError(
        'permission-denied',
        'User does not have permission to update this document'
      );
    }

    // Prepare the updated data, only including fields that have new values
    const toolsHistoryData = {
      ...(newResponse != null && { response: newResponse }),
      updatedAt: Timestamp.fromMillis(Date.now()), // Update the timestamp
    };

    // Update the document in Firestore with the new data
    await admin
      .firestore()
      .collection('toolsHistory')
      .doc(toolId)
      .update(toolsHistoryData);

    // Return a success response
    return {
      success: true,
      message: 'Document successfully updated!',
      data: toolsHistoryData,
    };
  } catch (error) {
    // Log the error and throw an HTTP error if document update fails
    console.error('Error updating document:', error);
    throw new HttpsError('internal', 'Unable to update document');
  }
});

// Function to delete an existing tools history document
const deleteToolsHistory = onCall(async (props) => {
  try {
    // Destructure the necessary fields from the incoming data
    const { toolId, userId } = props.data;

    // Check if any of the required fields are missing
    if (!toolId || !userId) {
      throw new HttpsError('invalid-argument', 'Missing value');
    }

    // Get the document from the 'toolsHistory' collection in Firestore
    const toolsHistoryRef = await admin
      .firestore()
      .collection('toolsHistory')
      .where('toolId', '==', toolId)
      .where('userId', '==', userId)
      .get();

    // Check if the document exists
    if (toolsHistoryRef.empty) {
      throw new HttpsError('not-found', 'Document does not exist');
    }

    // Get the document data
    const docRef = toolsHistoryRef.docs[0];
    const toolsHistory = docRef.data();

    // Check if the userId matches the userId of the document owner
    if (toolsHistory.userId !== userId) {
      throw new HttpsError(
        'permission-denied',
        'User does not have permission to delete this document'
      );
    }

    // Delete the document
    await docRef.ref.delete();

    // Return a success response with the document being removed
    return {
      success: true,
      message: 'Document successfully removed!',
    };
  } catch (error) {
    // Log the error and throw an HTTP error if document update fails
    console.error('Error deleting document:', error);
    throw new HttpsError('internal', 'Unable to delete document', error);
  }
});

// Function to retrieve an existing tools history document
const retrieveToolsHistory = onCall(async (props) => {
  try {
    // Destructure the necessary fields from the incoming data
    const { toolId, userId } = props.data;

    // Check if the toolId or userId fields are missing
    if (!toolId || !userId) {
      throw new HttpsError('invalid-argument', 'Missing value');
    }

    // Get the document from the 'toolsHistory' collection in Firestore
    const toolsHistoryRef = await admin
      .firestore()
      .collection('toolsHistory')
      .where('toolId', '==', toolId)
      .where('userId', '==', userId)
      .get();

    // Check if the document exists
    if (toolsHistoryRef.empty) {
      throw new HttpsError('not-found', 'Document does not exist');
    }
    // Get the document data
    const docRef = toolsHistoryRef.docs[0];
    const toolsHistory = docRef.data();

    // Check if the userId matches the userId of the document owner
    if (toolsHistory.userId !== userId) {
      throw new HttpsError(
        'permission-denied',
        'User does not have permission to update this document'
      );
    }

    // Return a success response
    return {
      success: true,
      message: 'Document successfully retrieved!',
      data: toolsHistory,
    };
  } catch (error) {
    // Log the error and throw an HTTP error if document retrieve fails
    console.error('Error retrieving document:', error);
    throw new HttpsError('internal', 'Unable to retrieve document', error);
  }
});

module.exports = {
  createToolsHistory,
  updateToolsHistory,
  deleteToolsHistory,
  retrieveToolsHistory,
};
