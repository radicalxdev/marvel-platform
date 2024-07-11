// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { httpsCallable } from 'firebase/functions';

// import { functions } from '@/redux/store';

// const fetchToolsHistory = createAsyncThunk(
//   'toolsHistory/fetch',
//   async (_, { getState }) => {
//     const {
//       user: { data: userData },
//     } = getState();

//     if (!userData?.id) {
//       throw new Error('User ID is not available in the state.');
//     }

//     try {
//       const fetchHistory = httpsCallable(functions, 'fetchUserHistoryData');
//       const response = await fetchHistory({ userId: userData.id });

//       return response.data;
//     } catch (error) {
//       throw new Error(error.message || 'Failed to fetch tools history.');
//     }
//   }
// );

// export default fetchToolsHistory;

import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const fetchToolsHistory = createAsyncThunk(
  'toolsHistory/fetch',
  async (_, { getState }) => {
    const state = getState();
    const { userId } = state.user.data;

    if (!userId) {
      throw new Error('User ID is not available in the state.');
    }

    try {
      const firestore = getFirestore(); // Get Firestore instance
      const toolSessionsQuery = query(
        collection(firestore, 'toolSessions'),
        where('user.id', '==', userId)
      );

      const toolSessionsSnapshot = await getDocs(toolSessionsQuery);

      if (toolSessionsSnapshot.empty) return { data: [] };

      const toolSessions = toolSessionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { data: toolSessions };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch tools history.');
    }
  }
);

export default fetchToolsHistory;
