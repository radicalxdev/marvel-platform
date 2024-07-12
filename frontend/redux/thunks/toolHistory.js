import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

import {
  setToolHistory,
  setToolHistoryError,
} from '@/redux/slices/toolhistorySlice';

export const fetchToolHistory = createAsyncThunk(
  'toolHistory/fetchToolHistory',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      if (!user || !user.data || !user.data.id) {
        return rejectWithValue('User ID is not available');
      }

      const userId = user.data.id;
      const firestore = getFirestore();
      const q = query(
        collection(firestore, 'toolSessions'),
        where('userID', '==', userId)
      );

      const querySnapshot = await getDocs(q);
      const outputData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return outputData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch tool history.');
    }
  }
);

export const listenToToolHistory = () => (dispatch, getState) => {
  try {
    const { user } = getState();

    if (!user || !user.data || !user.data.id) {
      throw new Error('User ID is not available in the state.');
    }

    const userId = user.data.id;
    const firestore = getFirestore();
    const q = query(
      collection(firestore, 'toolSessions'),
      where('userID', '==', userId)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const toolSessions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setToolHistory(toolSessions));
      },
      (error) => {
        dispatch(setToolHistoryError(error.message));
      }
    );
  } catch (error) {
    dispatch(setToolHistoryError(error.message));
    return null;
  }
};
