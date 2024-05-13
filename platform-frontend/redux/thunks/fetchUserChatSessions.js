import { createAsyncThunk } from '@reduxjs/toolkit';
import { httpsCallable } from 'firebase/functions';

const fetchUserChatSessions = createAsyncThunk(
  'chatSessions/fetch',
  async ({ functions, userId }) => {
    try {
      const getUserChatSessions = httpsCallable(
        functions,
        'getUserChatSessions'
      );
      const response = await getUserChatSessions({ userId });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export default fetchUserChatSessions;
