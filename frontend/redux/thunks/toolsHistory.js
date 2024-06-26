import { createAsyncThunk } from '@reduxjs/toolkit';
import { httpsCallable } from 'firebase/functions';

import { functions } from '@/redux/store'; // Ensure correct path to your Firebase functions

const fetchToolsHistory = createAsyncThunk(
  'toolsHistory/fetch',
  async ({ userId }) => {
    try {
      const fetchHistory = httpsCallable(functions, 'fetchUserHistoryData');
      const response = await fetchHistory({ userId });
      console.log('Fetched history data:', response.data); // Log fetched data
      return response.data;
    } catch (err) {
      console.error('Error fetching user history data:', err);
      throw err; // Throwing the error to be caught by extraReducers
    }
  }
);

export default fetchToolsHistory;
