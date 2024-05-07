import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { transformEnrolledDoc } from '@/utils/FirebaseUtils';

const fetchEnrolledChallenges = createAsyncThunk(
  'enrolledChallenges/fetch',
  async ({ firestore, id }) => {
    try {
      const enrolledChallengesQuery = query(
        collection(firestore, 'enrolledPlayers'),
        where('userId', '==', id)
      );

      const enrolledChallengesSnapshot = await getDocs(enrolledChallengesQuery);

      if (enrolledChallengesSnapshot.empty) return null;

      const enrolledChallenges = enrolledChallengesSnapshot.docs.map(
        (enrolledDoc) => {
          const { challengeId, ...challenge } = enrolledDoc.data();

          const transformedData = transformEnrolledDoc(challenge);

          return {
            challengeId,
            id: enrolledDoc.id,
            ...transformedData,
          };
        }
      );

      return enrolledChallenges;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export default fetchEnrolledChallenges;
