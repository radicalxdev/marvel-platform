import { createSlice } from '@reduxjs/toolkit';

import fetchInternals from '../thunks/internals';

const initialState = {
  data: null,
  loading: true,
  error: null,
};

const internalSlice = createSlice({
  name: 'internal',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchInternals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInternals.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchInternals.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default internalSlice.reducer;
