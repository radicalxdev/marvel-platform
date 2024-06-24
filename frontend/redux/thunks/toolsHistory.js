import { createAsyncThunk } from '@reduxjs/toolkit';

import { collection, getDoc, query } from 'firebase/firestore';

const fetchToolsHistory = createAsyncThunk(
  'toolsHistory/fetch',
  async ({ firestore }) => {
    try {
      const toolsHistoryQuery = query(collection(firestore, 'toolsHistory'));

      const toolsDocHistorySnapshot = await getDoc(toolsHistoryQuery);

      if (toolsDocHistorySnapshot.empty) return null;

      const toolsHistory = toolsDocHistorySnapshot.docs.map((doc) => {
        const { ...toolsHistoryData } = doc.data();
        return {
          ...toolsHistoryData,
          id: doc?.id,
        };
      });

      return toolsHistory;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export default fetchToolsHistory;
