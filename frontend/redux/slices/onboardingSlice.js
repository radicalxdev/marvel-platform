import { createSlice } from '@reduxjs/toolkit';

import { fetchUserData, submitOnboardingData } from '../thunks/user';

const initialState = {
  data: null,
  loading: false,
  error: null,
  step: 1,
  completed: false,
  tempData: {}, // Temporary storage for form data
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    reset: () => initialState,
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
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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

export const { reset, setStep, setCompleted, setTempData, clearTempData } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
