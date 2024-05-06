import { createSlice } from '@reduxjs/toolkit';

import fetchEnrolledChallenges from '../thunks/enrolledChallenges';
import fetchUserData from '../thunks/user';

const initialState = {
  data: null,
  loading: true,
  error: null,
};

const enrolledChallenges = createSlice({
  name: 'enrolledChallenges',
  initialState,
  reducers: {
    reset: () => initialState,
    updateEnrolledChallenge: (state, action) => {
      const { challengeId, updatedData } = action.payload;
      state.data[challengeId] = updatedData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolledChallenges.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserData.fulfilled && fetchEnrolledChallenges.fulfilled,
        (state, action) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchEnrolledChallenges.rejected, (state) => {
        state.error = 'Could not fetch user enrolled challenges';
        state.loading = false;
      });
  },
});

export const { reset, updateEnrolledChallenge } = enrolledChallenges.actions;

export default enrolledChallenges.reducer;
