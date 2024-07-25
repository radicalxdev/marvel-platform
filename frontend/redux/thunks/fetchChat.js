import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

/**
 * Async thunk to fetch a chat session from Firestore.
 *
 * @param {string} chatId The ID of the chat session to fetch.
 */
const fetchChat = createAsyncThunk('chat/fetchChat', async (chatId) => {
  // Get the Firestore instance
  const firestore = getFirestore();

  // Get the document reference for the chat session
  const docID = doc(firestore, 'chatSessions', chatId);

  // Retrieve the chat session data from the document
  const chatSessionRef = await getDoc(docID);
  const chatSession = chatSessionRef.data();

  // Convert Firestore timestamps to JavaScript Date objects and format as ISO strings
  chatSession.createdAt = chatSession.createdAt.toDate().toISOString();
  chatSession.updatedAt = chatSession.updatedAt.toDate().toISOString();

  // Convert each message timestamp from a Firestore Timestamp object to a JavaScript Date object and format it as an ISO string.
  chatSession.messages.forEach((message) => {
    // Convert Firestore timestamp to JavaScript Date object and format as ISO string
    message.timestamp = message.timestamp.toDate().toISOString();
  });

  // Return the fetched chat session
  return chatSession;
});

export default fetchChat;
