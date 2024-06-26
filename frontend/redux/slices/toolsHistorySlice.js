import { createSlice } from '@reduxjs/toolkit';

import fetchToolsHistory from '../thunks/toolsHistory';

const initialState = {
  loading: false,
  data: [], // This will hold the overall tool history data
  sessions: [], // This will hold the individual tool sessions data
  error: null,
};

const toolsHistory = createSlice({
  name: 'toolsHistory',
  initialState,
  reducers: {
    resetToolsHistory: (state) => {
      state.loading = false;
      state.data = [];
      state.sessions = [];
      state.error = null;
    },
    setToolSessionData: (state, action) => {
      state.sessions.push(action.payload); // Add new session to sessions array
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToolsHistory.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(fetchToolsHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // Update data on successful fetch
        state.error = null; // Reset error state on success
      })
      .addCase(fetchToolsHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error state on rejection
      });
  },
});

export const { resetToolsHistory, setToolSessionData } = toolsHistory.actions;

export default toolsHistory.reducer;
