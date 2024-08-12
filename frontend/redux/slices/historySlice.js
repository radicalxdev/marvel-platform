import { createSlice } from '@reduxjs/toolkit';

import fetchHistory from '../thunks/history';

const initialState = {
  data: null,
  loading: true,
  error: null,
};

const history = createSlice({
  name: 'history',
  initialState,
  reducers: {
    reset: () => initialState,
    setHistoryData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchHistory.rejected, (state) => {
        state.error = 'Could not get history';
        state.loading = false;
      });
  },
});

export const { reset, setHistoryData } = history.actions;

export default history.reducer;
