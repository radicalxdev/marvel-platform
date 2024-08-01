import { createSlice } from '@reduxjs/toolkit';

import { fetchUserData, submitOnboardingData } from '../thunks/user';

const initialState = {
  data: null,
  loading: false,
  error: null,
  step: 1,
  completed: false,
  tempData: {},
};

const userData = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
    setTempData: (state, action) => {
      state.tempData = { ...state.tempData, ...action.payload };
    },
    clearTempData: (state) => {
      state.tempData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.error = 'Could not get user data';
        state.loading = false;
      })
      .addCase(submitOnboardingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOnboardingData.fulfilled, (state) => {
        state.loading = false;
        state.completed = true;
        state.tempData = {}; // Clear temp data on success
      })
      .addCase(submitOnboardingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  reset,
  setUserData,
  setStep,
  setCompleted,
  setTempData,
  clearTempData,
} = userData.actions;

export default userData.reducer;
