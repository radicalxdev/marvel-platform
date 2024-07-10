import { createAsyncThunk } from '@reduxjs/toolkit';
import { httpsCallable } from 'firebase/functions';

import { functions } from '@/redux/store';

const fetchToolsHistory = createAsyncThunk(
  'toolsHistory/fetch',
  async (_, { getState }) => {
    const {
      user: { data: userData },
    } = getState();

    if (!userData?.id) {
      throw new Error('User ID is not available in the state.');
    }

    try {
      const fetchHistory = httpsCallable(functions, 'fetchUserHistoryData');
      const response = await fetchHistory({ userId: userData.id });

      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch tools history.');
    }
  }
);

export default fetchToolsHistory;
