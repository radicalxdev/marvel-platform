import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';

import fetchLastEnrolledPlayersAvatars from './fetchLastEnrolledPlayersAvatars';
import { convertToUnixTimestamp } from '@/utils/FirebaseUtils';

/**
 * Async thunk function to fetch quests from Firestore
 *
 * @param {Object} firestore - Firestore instance
 * @param {Object} challengeType - Type of challenge to be fetched
 * @returns {Array} - Array of mission objects
 */
const fetchChallenges = createAsyncThunk(
  'challenges/fetchChallenges',
  async ({ firestore, challengeType }, { dispatch }) => {
    try {
      // Get reference to challenges collection
      const challengeRef = query(
        collection(firestore, 'challenges'),
        where('type', '==', challengeType)
      );

      // Get snapshot of challenges collection
      const querySnapshot = await getDocs(challengeRef);
      // Map over challenge documents to return an array of challenges
      const challenges = querySnapshot.docs.map((challenge) => {
        const { endTime, startTime, name, players, ...document } =
          challenge.data();

        const maskedId = `${name.replace(/ /g, '-')}-${moment(
          convertToUnixTimestamp(startTime)
        ).format('YYYY-MMM-DD')}`;

        const isMaxCapacity = players.total === players.capacity;

        return {
          id: challenge.id,
          name,
          maskedId,
          isMaxCapacity,
          players,
          endTime: convertToUnixTimestamp(endTime),
          startTime: convertToUnixTimestamp(startTime),
          ...document,
        };
      });

      // Dispatch thunk to fetch last enrolled players avatars
      const lastEnrolledPlayersAvatars = await dispatch(
        fetchLastEnrolledPlayersAvatars({ firestore, challenges })
      );

      // Add lastEnrolledPlayersAvatars to challenges array
      const challengesWithAvatars = challenges.map((challenge) => {
        challenge.lastEnrolledPlayersAvatars =
          lastEnrolledPlayersAvatars.payload?.[challenge.id];
        return challenge;
      });

      // return array of challenges
      return { data: challengesWithAvatars, challengeType };
    } catch (error) {
      throw new Error(error);
    }
  }
);

export default fetchChallenges;
