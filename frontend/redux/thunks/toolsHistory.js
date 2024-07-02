import { createAsyncThunk } from '@reduxjs/toolkit';
import { httpsCallable } from 'firebase/functions';

import { functions } from '@/redux/store';

const fetchToolsHistory = createAsyncThunk(
  'toolsHistory/fetch',
  async ({ userId }) => {
    try {
      const fetchHistory = httpsCallable(functions, 'fetchUserHistoryData');
      const response = await fetchHistory({ userId });

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export default fetchToolsHistory;
