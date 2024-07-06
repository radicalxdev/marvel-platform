import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { formatToStandardDate } from '../../utils/FirebaseUtils';

const fetchHistory = createAsyncThunk(
  'history/fetch',
  async ({ firestore, id }) => {
    // Query to fetch kai tools history
    try {
      const historyQuery = query(
        collection(firestore, 'toolsHistory'),
        where('userId', '==', id)
      );

      const historyDocsSnapshot = await getDocs(historyQuery);

      if (historyDocsSnapshot.empty) return null;

      const history = historyDocsSnapshot.docs?.map((doc) => {
        const { ...historyData } = doc.data();

        return {
          id: doc?.id,
          ...historyData,
          createdAt: formatToStandardDate(historyData.createdAt.toDate()),
          updatedAt: formatToStandardDate(historyData.updatedAt.toDate()),
        };
      });

      return history;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export default fetchHistory;
