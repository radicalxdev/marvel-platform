import { createSlice } from '@reduxjs/toolkit';

import fetchOnboardingData from '../thunks/onboarding';

const initialState = {
  data: null,
  loading: false,
  error: null,
  // Add additional properties here if needed
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    // Define any synchronous actions here if needed
    reset: () => initialState,
    // Example of additional reducers
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnboardingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOnboardingData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOnboardingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reset, setLoading, setError } = onboardingSlice.actions;

export default onboardingSlice.reducer;
