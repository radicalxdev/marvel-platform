import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';

/**
 * Fetches the avatars of the last 5 players that enrolled in each challenge
 * @param {Object} firestore - The Firestore instance to query
 * @param {Array} challenges - Array of challenges to fetch top players for
 * @returns {Object} - Object mapping challenge IDs to arrays of avatar URLs
 */
const fetchLastEnrolledPlayersAvatars = createAsyncThunk(
  'challenges/fetchLastEnrolledPlayersAvatars',
  async ({ firestore, challenges }) => {
    try {
      const lastEnrolledPlayersAvatars = {};

      await Promise.all(
        challenges.map(async (challenge) => {
          const challengeId = challenge.id;

          const enrolledPlayersQuery = query(
            collection(firestore, 'enrolledPlayers'),
            where('challengeId', '==', challengeId),
            limit(3)
          );

          const enrolledPlayersSnapshot = await getDocs(enrolledPlayersQuery);

          if (enrolledPlayersSnapshot.empty) {
            lastEnrolledPlayersAvatars[challengeId] = [];
            return;
          }

          const userIds = enrolledPlayersSnapshot.docs.map(
            (document) => document.data().userId
          );

          const usersQuery = query(
            collection(firestore, 'users'),
            where('id', 'in', userIds)
          );

          const usersSnapshot = await getDocs(usersQuery);

          const avatarIds = usersSnapshot.docs.map(
            (user) => user.data().avatarId
          );

          lastEnrolledPlayersAvatars[challengeId] = avatarIds;
        })
      );

      // Iterate through each challenge and if an empty array is found replace it with challenges.lastEnrolledPlayersAvatars else empty array

      Object.keys(lastEnrolledPlayersAvatars).map((key) => {
        const challenge = challenges.find((doc) => doc.id === key);
        const avatars = lastEnrolledPlayersAvatars[key];

        if (avatars.length < 1) {
          lastEnrolledPlayersAvatars[key] =
            challenge.lastEnrolledPlayersAvatars || [];
          return null;
        }
        return null;
      });

      return lastEnrolledPlayersAvatars;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export default fetchLastEnrolledPlayersAvatars;
