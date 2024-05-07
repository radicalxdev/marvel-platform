import { createSlice } from '@reduxjs/toolkit';

import fetchChallenges from '../thunks/challenges';
import fetchLastEnrolledPlayersAvatars from '../thunks/fetchLastEnrolledPlayersAvatars';

const initialState = {
  quest: { data: null, loading: true, error: null },
  mission: { data: null, loading: true, error: null },
  hackathon: { data: null, loading: true, error: null },
};

const challengesSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...state, [action.payload]: null, loading: true, error: null };
    },
    updateLastEnrolledPlayersAvatars: (state, action) => {
      const { id, avatarIds, challengeType } = action.payload;
      state[challengeType].data = state[challengeType].data?.map((doc) => {
        if (doc.id === id) {
          return {
            ...doc,
            lastEnrolledPlayersAvatars: avatarIds,
          };
        }
        return doc;
      });
    },
    updateChallengeDoc: (state, action) => {
      const { id, challengeType } = action.payload;

      state[challengeType].data = state[challengeType].data?.map((doc) => {
        if (doc.id === id) {
          const { entryFee, prizePool, players } = doc;

          return {
            ...doc,
            prizePool: prizePool + Math.round(entryFee * 0.8),
            entryFee,
            players: { total: players.total + 1, ...players },
          };
        }
        return doc;
      });
    },
    setChallengesLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fulfilled state (when fetchMissions is successful)
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        const { data, challengeType } = action.payload;

        state[challengeType].data = data;
        state[challengeType].loading = false;
      })
      // Handle rejected state (when fetchMissions fails)
      .addCase(fetchChallenges.rejected, (state) => {
        state.quest.loading = false;
        state.mission.loading = false;
        state.quest.error = 'Could not fetch challenges';
        state.mission.error = 'Could not fetch challenges';
      })
      // Handle rejected state (when fetchLastEnrolledPlayersAvatars fails)
      .addCase(fetchLastEnrolledPlayersAvatars.rejected, (state) => {
        state.quest.loading = false;
        state.mission.loading = false;
        state.quest.error = 'Unable to fetch last enrolled players avatars';
        state.mission.error = 'Unable to fetch last enrolled players avatars';
      });
  },
});

export const {
  reset,
  updateLastEnrolledPlayersAvatars,
  updateChallengeDoc,
  setChallengesLoading,
} = challengesSlice.actions;

export default challengesSlice.reducer;
