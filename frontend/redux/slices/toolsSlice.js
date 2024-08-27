import { createSlice } from '@reduxjs/toolkit';

import fetchTools from '../thunks/tools';

const toolsState = {
  data: null,
  loading: true,
  error: null,
};

const communicator = {
  prompt: null,
  response: null,
  communicatorLoading: false,
  formOpen: true,
};

const toolsSessionState = {
  sessionId: null,
};

const initialState = {
  ...toolsState,
  ...communicator,
  ...toolsSessionState,
};

const tools = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    reset: () => initialState,
    resetCommunicator: (state) => ({ ...state, ...communicator }),
    resetToolsSessionState: (state) => ({ ...state, ...toolsSessionState }),
    setToolsSessionState: (state, action) => {
      const { sessionId } = action.payload;
      state.sessionId = sessionId;
    },
    setCommunicatorLoading: (state, action) => {
      state.communicatorLoading = action.payload;
    },
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setFormOpen: (state, action) => {
      state.formOpen = action.payload;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTools.rejected, (state) => {
        state.error = 'Could not get tools';
        state.loading = false;
      });
  },
});

export const {
  reset,
  setCommunicatorLoading,
  setToolsSessionState,
  resetToolsSessionState,
  setPrompt,
  setResponse,
  setFormOpen,
  setError,
  resetCommunicator,
} = tools.actions;

export default tools.reducer;
