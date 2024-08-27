import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { firestore } from '@/redux/store';

export const fetchToolHistory = createAsyncThunk(
  'toolHistory/fetchToolHistory',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        auth: {
          data: { uid },
        },
      } = getState();

      if (!uid) throw new Error('User Id is not available');

      const toolSessionsRef = query(
        collection(firestore, 'toolSessions'),
        where('userId', '==', uid)
      );

      if (toolSessionsRef.empty) throw new Error('No tool sessions found');

      const querySnapshot = await getDocs(toolSessionsRef);

      const outputData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return outputData;
    } catch (error) {
      return rejectWithValue(error?.message || 'Unable to fetch tool history');
    }
  }
);
