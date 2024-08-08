const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');

// Function to create a new tools session document
const createToolsSession = onCall(async (props) => {
  try {
    // Destructure the necessary fields from the incoming data
    const { toolId, userId, inputs, outputs } = props.data;

    // Check if any of the required fields are missing
    if (!toolId || !userId || !inputs || !outputs) {
      throw new HttpsError('invalid-argument', 'Missing value');
    }

    // Prepare the data to be stored in Firestore
    const sessionData = {
      toolId: toolId,
      userId: userId,
      createdAt: Timestamp.fromMillis(Date.now()), // Set the creation timestamp
      updatedAt: Timestamp.fromMillis(Date.now()), // Set the update timestamp
      response: [
        {
          inputs: inputs,
          outputs: outputs,
          updatedAt: Timestamp.fromMillis(Date.now()),
        },
      ],
    };

    // Add the new document to the 'toolsSession' collection in Firestore
    const toolsSessionRef = await admin
      .firestore()
      .collection('toolsSession')
      .add(sessionData);

    // Update the document to include its ID
    await toolsSessionRef.update({
      sessionId: toolsSessionRef.id,
    });

    // Return a success response with the new document's ID
    return {
      success: true,
      message: 'Document successfully written!',
      sessionId: toolsSessionRef.id,
    };
  } catch (error) {
    // Log the error and throw an HTTP error if document creation fails
    console.error('Error creating document:', error);
    throw new HttpsError('internal', 'Unable to write document');
  }
});

// Function to update an existing tools Session document
const updateToolsSession = onCall(async (props) => {
  try {
    // Destructure the necessary fields from the incoming data
    const { sessionId, toolId, userId, newInputs, newOutputs } = props.data;

    // Check if the toolId or userId fields are missing
    if (!toolId || !userId || !sessionId) {
      throw new HttpsError('invalid-argument', 'Missing value');
    }

    // Get the document from Firestore using the provided toolId
    const toolsSessionDoc = await admin
      .firestore()
      .collection('toolsSession')
      .doc(sessionId)
      .get();

    // Check if the document exists
    if (!toolsSessionDoc.exists) {
      throw new HttpsError('not-found', 'Document does not exist');
    }

    // Get the document data
    const toolsSessionData = toolsSessionDoc.data();

    // Check if the userId matches the userId of the document owner
    if (toolsSessionData.userId !== userId) {
      throw new HttpsError(
        'permission-denied',
        'User does not have permission to update this document'
      );
    }

    // Prepare the data to be updated in Firestore
    const updatedToolsSessionData = {
      ...toolsSessionData,
      updatedAt: admin.firestore.Timestamp.fromMillis(Date.now()),
      response: [
        ...toolsSessionData.response,
        {
          inputs: newInputs,
          outputs: newOutputs,
          updatedAt: admin.firestore.Timestamp.fromMillis(Date.now()),
        },
      ],
    };

    // Update the document in Firestore with the new data
    await admin
      .firestore()
      .collection('toolsSession')
      .doc(sessionId)
      .update(updatedToolsSessionData);

    // Return a success response
    return {
      success: true,
      message: 'Document successfully updated!',
      sessionId: sessionId,
    };
  } catch (error) {
    // Log the error and throw an HTTP error if document update fails
    console.error('Error updating document:', error);
    throw new HttpsError('internal', 'Unable to update document');
  }
});

// Function to delete an existing tools Session document
const deleteToolsSession = onCall(async (props) => {
  try {
    // Destructure the necessary fields from the incoming data
    const { toolId, userId } = props.data;

    // Check if any of the required fields are missing
    if (!toolId || !userId) {
      throw new HttpsError('invalid-argument', 'Missing value');
    }

    // Get the document from the 'toolsSession' collection in Firestore
    const toolsSessionRef = await admin
      .firestore()
      .collection('toolsSession')
      .where('toolId', '==', toolId)
      .where('userId', '==', userId)
      .get();

    // Check if the document exists
    if (toolsSessionRef.empty) {
      throw new HttpsError('not-found', 'Document does not exist');
    }

    // Get the document data
    const docRef = toolsSessionRef.docs[0];
    const toolsSession = docRef.data();

    // Check if the userId matches the userId of the document owner
    if (toolsSession.userId !== userId) {
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

module.exports = {
  createToolsSession,
  updateToolsSession,
  deleteToolsSession,
};
