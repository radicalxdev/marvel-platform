import { createSlice } from '@reduxjs/toolkit';

import fetchToolsHistory from '../thunks/toolsHistory';

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const toolsHistory = createSlice({
  name: 'toolsHistory',
  initialState,
  reducers: {
    resetToolsHistory: () => initialState,
    setToolsHistory: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToolsHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchToolsHistory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchToolsHistory.rejected, (state) => {
        state.error = 'Could not get tools history';
        state.loading = false;
      });
  },
});

export const { resetToolsHistory, setToolsHistory } = toolsHistory.actions;

export default toolsHistory.reducer;
