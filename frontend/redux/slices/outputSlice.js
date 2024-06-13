import { createSlice } from '@reduxjs/toolkit';

import { fetchOutputHistory } from '../thunks/output';

const initialState = {
  data: null,
  loading: true,
  error: null,
};

const outputHistorySlice = createSlice({
  name: 'outputHistory',
  initialState,
  reducers: {
    // Define any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutputHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutputHistory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchOutputHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default outputHistorySlice.reducer;
