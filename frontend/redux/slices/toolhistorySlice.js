import { createSlice } from '@reduxjs/toolkit';

import { fetchToolHistory } from '../thunks/toolHistory';

const initialState = {
  data: null,
  loading: true,
  error: null,
};

const toolHistorySlice = createSlice({
  name: 'toolHistory',
  initialState,
  reducers: {
    setToolHistory: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setToolHistoryError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToolHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolHistory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchToolHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setToolHistory, setToolHistoryError } = toolHistorySlice.actions;
export default toolHistorySlice.reducer;
