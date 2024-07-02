import { createSlice } from '@reduxjs/toolkit';

import fetchToolsHistory from '../thunks/toolsHistory';

const initialState = {
  loading: true,
  data: [],
  error: null,
};

const toolsHistorySlice = createSlice({
  name: 'toolsHistory',
  initialState,
  reducers: {
    // add reducer functions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToolsHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolsHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(fetchToolsHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetToolsHistory } = toolsHistorySlice.actions;

export default toolsHistorySlice.reducer;
