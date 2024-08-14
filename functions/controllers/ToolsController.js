const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');

// Helper function to create a new tools session document
const createToolsSession = async (payload) => {
  try {
    // Destructure the necessary fields from the incoming data
    const { toolId, userId, inputs, outputs } = payload.data;

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
      message: 'Document successfully created!',
      sessionId: toolsSessionRef.id,
    };
  } catch (error) {
    // Log the error and throw an HTTP error if document creation fails
    console.error('Error creating document:', error);
    throw new HttpsError('internal', 'Unable to write document');
  }
};

// Helper function to update an existing tools Session document
const updateToolsSession = async (payload) => {
  try {
    // Destructure the necessary fields from the incoming data
    const { sessionId, toolId, userId, inputs, outputs } = payload.data;

    // Check if the toolId or userId fields are missing
    if (!toolId || !userId || !sessionId || !inputs || !outputs) {
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
          inputs: inputs,
          outputs: outputs,
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
};

// Firebase Function to delete an existing tools Session document
const deleteToolsSession = onCall(async (props) => {
  try {
    const { sessionId, toolId, userId } = props.data;

    // Validate required fields
    if (!toolId || !userId || !sessionId) {
      throw new HttpsError('invalid-argument', 'Missing required parameters');
    }

    // Query for the specific document using all required fields
    const querySnapshot = await admin
      .firestore()
      .collection('toolsSession')
      .where('toolId', '==', toolId)
      .where('userId', '==', userId)
      .where('sessionId', '==', sessionId)
      .limit(1)
      .get();

    // Check if the document exists
    if (querySnapshot.empty) {
      throw new HttpsError('not-found', 'Document does not exist');
    }

    // Delete the found document
    const docRef = querySnapshot.docs[0].ref;
    await docRef.delete();

    // Return success response
    return {
      success: true,
      message: 'Document successfully removed!',
    };
  } catch (error) {
    // Log the error and throw an HTTP error if deletion fails
    console.error('Error deleting document:', error);
    throw new HttpsError('internal', 'Unable to delete document', error);
  }
});

// Firebase function to determine the state of a tools session (whether a session is being created or updated)
const determineToolsSessionState = onCall(async (props) => {
  try {
    // Destructure the necessary fields from the incoming request data
    const { toolId, userId, inputs, outputs } = props.data;

    // Check if any of the required fields are missing
    if (!toolId || !userId || !inputs || !outputs) {
      throw new HttpsError('invalid-argument', 'Missing value');
    }

    let response; // Initialize a variable to hold the response

    // Check if the sessionId exists in the incoming data
    if (props.data.sessionId != null) {
      // If sessionId exists, call the updateToolsSession function to update the session
      response = await updateToolsSession(props);
    } else {
      // If sessionId doesn't exist, prepare data to create a new session
      const createProps = {
        data: {
          toolId: toolId, // ID of the tool being used
          userId: userId, // ID of the user
          inputs: inputs, // User inputs for the session
          outputs: outputs, // Expected outputs for the session
        },
      };
      // Call the createToolsSession function to create a new session
      response = await createToolsSession(createProps);
    }

    // Return the response, either from updating or creating the session
    return response;
  } catch (error) {
    // If any error occurs, throw an internal error indicating failure to determine session state
    throw new HttpsError('internal', 'Unable to determine tools session state');
  }
});

module.exports = {
  deleteToolsSession,
  determineToolsSessionState,
};
