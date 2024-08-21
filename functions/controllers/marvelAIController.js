const admin = require('firebase-admin');
const storage = admin.storage();
const {
  onCall,
  HttpsError,
  onRequest,
} = require('firebase-functions/v2/https');
const { default: axios } = require('axios');
const { logger } = require('firebase-functions/v1');
const { Timestamp } = require('firebase-admin/firestore');
const { BOT_TYPE, AI_ENDPOINTS } = require('../constants');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const busboy = require('busboy');
const app = express();

const DEBUG = process.env.DEBUG;

/**
 * Simulates communication with the Marvel AI endpoint.
 *
 * @function kaiCommunicator
 * @param {object} payload - The properties of the communication.
 * @param {object} props.data - The payload data object used in the communication.
 *  @param {Array} props.data.messages - An array of messages for the current user chat session.
 *  @param {object} props.data.user - The user object.
 *    @param {string} props.data.user.id - The id of the current user.
 *    @param {string} props.data.user.fullName - The user's full name.
 *    @param {string} props.data.user.email - The users email.
 *  @param {object} props.data.tool_data - The payload data object used in the communication.
 *    @param {string} props.data.tool_data.tool_id - The payload data object used in the communication.
 *    @param {Array} props.data.tool_data.inputs - The different form input values sent for a tool.
 *  @param {string} props.data.type - The payload data object used in the communication.
 *
 * @return {object} The response from the AI service.
 */
const marvelCommunicator = async (payload) => {
  try {
    DEBUG && logger.log('marvelCommunicator started, data:', payload.data);

    const { messages, user, tool_data, type } = payload.data;
    const isToolCommunicator = type === BOT_TYPE.TOOL;

    const MARVEL_API_KEY = 'AIzaSyBT0cxIrvcSUL8Ylfmrt8gra9BYb_K20kE';
    const MARVEL_ENDPOINT = 'https://kai-ai-f63c8.wl.r.appspot.com';

    DEBUG &&
      logger.log(
        'Communicator variables:',
        `API_KEY: ${MARVEL_API_KEY}`,
        `ENDPOINT: ${MARVEL_ENDPOINT}`
      );

    const headers = {
      'API-Key': MARVEL_API_KEY,
      'Content-Type': 'application/json',
    };

    const marvelPayload = {
      user,
      type,
      ...(isToolCommunicator ? { tool_data } : { messages }),
    };

    DEBUG && logger.log('MARVEL_ENDPOINT', MARVEL_ENDPOINT);
    DEBUG && logger.log('marvelPayload', marvelPayload);

    const resp = await axios.post(
      `${MARVEL_ENDPOINT}${AI_ENDPOINTS[type]}`,
      marvelPayload,
      {
        headers,
      }
    );

    DEBUG && logger.log('marvelCommunicator response:', resp.data);

    return { status: 'success', data: resp.data };
  } catch (error) {
    const {
      response: { data },
    } = error;
    const { message } = data;
    DEBUG && logger.error('marvelCommunicator error:', data);
    throw new HttpsError('internal', message);
  }
};

/**
 * Manages communications for a specific chat session with a chatbot, updating and retrieving messages.
 *
 * @function chat
 * @param {object} props - The properties of the communication.
 * @param {object} props.data - The data object containing the message and id.
 * @param {string} props.data.id - The id of the chat session.
 * @param {string} props.data.message - The message object.
 *
 * @return {object} The response object containing the status and data.
 */
const chat = onCall(async (props) => {
  try {
    DEBUG && logger.log('Communicator started, data:', props.data);

    const { message, id } = props.data;

    DEBUG &&
      logger.log(
        'Communicator variables:',
        `API_KEY: ${process.env.MARVEL_API_KEY}`,
        `ENDPOINT: ${process.env.MARVEL_ENDPOINT}`
      );

    const chatSession = await admin
      .firestore()
      .collection('chatSessions')
      .doc(id)
      .get();

    if (!chatSession.exists) {
      logger.log('Chat session not found: ', id);
      throw new HttpsError('not-found', 'Chat session not found');
    }

    const { user, type, messages } = chatSession.data();

    let truncatedMessages = messages;

    // Check if messages length exceeds 50, if so, truncate
    if (messages.length > 100) {
      truncatedMessages = messages.slice(messages.length - 65);
    }

    // Update message structure here
    const updatedMessages = truncatedMessages.concat([
      {
        ...message,
        timestamp: Timestamp.fromMillis(Date.now()), // ISO 8601 format string
      },
    ]);

    await chatSession.ref.update({ messages: updatedMessages });

    // Construct payload for the marvelCommunicator
    const marvelPayload = {
      messages: updatedMessages,
      type,
      user,
    };

    const response = await marvelCommunicator({
      data: marvelPayload,
    });

    DEBUG && logger.log('marvelCommunicator response:', response.data);

    // Process response and update Firestore
    const updatedResponseMessages = updatedMessages.concat(
      response.data?.data?.map((msg) => ({
        ...msg,
        timestamp: Timestamp.fromMillis(Date.now()), // ensure consistent timestamp format
      }))
    );

    await chatSession.ref.update({ messages: updatedResponseMessages });

    if (DEBUG) {
      logger.log(
        'Updated chat session: ',
        (await chatSession.ref.get()).data()
      );
    }

    return { status: 'success' };
  } catch (error) {
    DEBUG && logger.log('Communicator error:', error);
    throw new HttpsError('internal', error.message);
  }
});

/**
 * Handles tool communications by processing input data and optional file uploads.
 * It supports both JSON and form-data requests to accommodate different client implementations.
 *
 * @function tools
 * @param {Request} req - The Express request object, which includes form data and files.
 * @param {Response} res - The Express response object used to send back the HTTP response.
 * @return {void} Sends a response to the client based on the processing results.
 * @throws {HttpsError} Throws an error if processing fails or data is invalid.
 */
app.post('/api/tool/', (req, res) => {
  const bb = busboy({ headers: req.headers });

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const uploads = [];
  const data = [];

  bb.on('file', (fieldname, file, info) => {
    const { filename } = info;
    const fileId = uuidv4();
    const filePath = `uploads/${fileId}-${filename}`;
    const { name: bucketName } = storage.bucket();

    const fileWriteStream = storage
      .bucket(bucketName)
      .file(filePath)
      .createWriteStream();

    file.pipe(fileWriteStream);

    const uploadPromise = new Promise((resolve, reject) => {
      fileWriteStream.on('finish', async () => {
        // Make the file publicly readable
        await storage.bucket(bucketName).file(filePath).makePublic();

        // Construct the direct public URL
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`;

        DEBUG &&
          logger.log(`File ${filename} uploaded and available at ${publicUrl}`);

        resolve({ filePath, url: publicUrl, filename });
      });

      fileWriteStream.on('error', reject);
    });

    uploads.push(uploadPromise);
  });

  bb.on('field', (name, value) => {
    data[name] = value;
  });

  bb.on('finish', async () => {
    try {
      DEBUG && logger.log('data:', JSON.parse(data?.data));
      // Destructure data here
      const {
        tool_data: { inputs, ...otherToolData },
        sessionId: sessionId,
        ...otherData
      } = JSON.parse(data?.data);

      const results = await Promise.all(uploads);

      res.set('Access-Control-Allow-Origin', '*'); // @todo: set the correct origin for security!
      res.set('Access-Control-Allow-Methods', 'POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');

      const modifiedInputs =
        uploads?.length > 0
          ? [...inputs, { name: 'files', value: results }]
          : inputs;

      const response = await marvelCommunicator({
        data: {
          ...otherData,
          tool_data: {
            ...otherToolData,
            inputs: modifiedInputs,
          },
        },
      });
      DEBUG && logger.log(response);

      // Determine state here
      const sessionRef = await saveResponseToFirestore({
        outputs: response.data.data,
        inputs: modifiedInputs,
        toolId: otherToolData.tool_id,
        userId: otherData.user.id,
        sessionId: sessionId,
      });

      res.status(200).json({
        success: true,
        data: response.data,
        sessionId: sessionRef.sessionId,
      });
    } catch (error) {
      logger.error('Error processing request:', error);
      res.status(500).json({ success: false, message: error?.message });
    }
  });

  bb.end(req.rawBody);
});

/**
 * Save the tool session response to Firestore by either
 * creating a new tools session document or updating an exisitng document
 * @param {object} sessionData - The data to be saved to Firestore
 * @param {string} userId - The ID of the user
 * @param {string} toolId - The ID of the tool
 * @param {string} sessionId - The ID of the session if it exists
 * @param {Array} inputs - User request
 * @param {Array} outputs - Tool response
 * @return {object} The session ID
 */
const saveResponseToFirestore = async (sessionData) => {
  try {
    const { sessionId, outputs, inputs, toolId, userId } = sessionData;

    // add new toolSession document if sessionId exists
    if (sessionId == null) {
      const toolSessionRef = await admin
        .firestore()
        .collection('toolSessions')
        .add({
          toolId: toolId,
          userId: userId,
          response: [
            {
              inputs: inputs,
              outputs: outputs,
              updatedAt: Timestamp.fromMillis(Date.now()),
            },
          ],
          createdAt: Timestamp.fromMillis(Date.now()),
          updatedAt: Timestamp.fromMillis(Date.now()),
        });
      await toolSessionRef.update({
        sessionId: toolSessionRef.id,
      });
      logger.log('SessionId: ' + toolSessionRef.id);
      return {
        sessionId: toolSessionRef.id,
      };
    } else {
      // update existing toolSession document otherwise if sessionId exists

      // Get the document from Firestore using the provided toolId
      const toolsSessionDoc = await admin
        .firestore()
        .collection('toolSessions')
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

      // Update the document in Firestore with the new data
      await admin
        .firestore()
        .collection('toolSessions')
        .doc(sessionId)
        .update({
          ...toolsSessionData,
          updatedAt: Timestamp.fromMillis(Date.now()),
          response: [
            ...toolsSessionData.response,
            {
              inputs: inputs,
              outputs: outputs,
              updatedAt: admin.firestore.Timestamp.fromMillis(Date.now()),
            },
          ],
        });

      return {
        sessionId: sessionId,
      };
    }
  } catch (error) {
    logger.error('Error saving tool session to Firestore:', error);
  }
};

/**
 * This creates a chat session for a user.
 * If the chat session already exists, it will return the existing chat session.
 * Otherwise, it will create a new chat session and send the first message.
 *
 * @function createChatSession
 * @param {Object} props - The properties passed to the function.
 * @param {Object} props.data - The data object containing the user, challenge, message, and botType.
 * @param {Object} props.data.user - The user object.
 * @param {Object} props.data.message - The message object.
 * @param {Object} props.data.type - The bot type.
 *
 * @return {Promise<Object>} - A promise that resolves to an object containing the status and data of the chat sessions.
 * @throws {HttpsError} Throws an error if there is an internal error.
 */
const createChatSession = onCall(async (props) => {
  try {
    DEBUG && logger.log('Communicator started, data:', props.data);

    const { user, message, type } = props.data;

    if (!user || !message || !type) {
      logger.log('Missing required fields', props.data);
      throw new HttpsError('invalid-argument', 'Missing required fields');
    }

    const initialMessage = {
      ...message,
      timestamp: Timestamp.fromMillis(Date.now()),
    };

    // Create new chat session if it doesn't exist
    const chatSessionRef = await admin
      .firestore()
      .collection('chatSessions')
      .add({
        messages: [initialMessage],
        user,
        type,
        createdAt: Timestamp.fromMillis(Date.now()),
        updatedAt: Timestamp.fromMillis(Date.now()),
      });

    // Send trigger message to ReX AI
    const response = await marvelCommunicator({
      data: {
        messages: [initialMessage],
        user,
        type,
      },
    });

    DEBUG && logger.log('response: ', response?.data, 'type', typeof response);

    const { messages } = (await chatSessionRef.get()).data();
    DEBUG && logger.log('updated messages: ', messages);

    // Add response to chat session
    const updatedResponseMessages = messages.concat(
      Array.isArray(response.data?.data)
        ? response.data?.data?.map((message) => ({
            ...message,
            timestamp: Timestamp.fromMillis(Date.now()),
          }))
        : [
            {
              ...response.data?.data,
              timestamp: Timestamp.fromMillis(Date.now()),
            },
          ]
    );

    await chatSessionRef.update({
      messages: updatedResponseMessages,
      id: chatSessionRef.id,
    });

    const updatedChatSession = await chatSessionRef.get();
    DEBUG && logger.log('Updated chat session: ', updatedChatSession.data());

    const createdChatSession = {
      ...updatedChatSession.data(),
      id: updatedChatSession.id,
    };

    DEBUG && logger.log('Created chat session: ', createdChatSession);

    logger.log('Successfully communicated');
    return {
      status: 'created',
      data: createdChatSession,
    };
  } catch (error) {
    logger.error(error);
    throw new HttpsError('internal', error.message);
  }
});

/** Deletes an existing tools Session document
 * @function deleteToolsSession
 * @param {string} sessionId - The ID of the session to delete
 * @param {string} toolId - The ID of the tool to delete
 * @param {string} userId - The ID of the user who created the session
 * @return {Promise<Object>} - A promise that resolves to an object containing the status and data of the tools session
 * @throws {HttpsError} Throws an error if there is an internal error
 */
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
      .collection('toolSessions')
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

module.exports = {
  chat,
  tool: onRequest({ minInstances: 1 }, app),
  createChatSession,
  deleteToolsSession,
};
