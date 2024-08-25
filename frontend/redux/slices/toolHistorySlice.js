import { createSlice } from '@reduxjs/toolkit';

import { fetchToolHistory } from '../thunks/toolHistory';

const initialState = {
  data: [],
  loading: true,
  error: null,
};

const ToolHistorySlice = createSlice({
  name: 'toolHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToolHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolHistory.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchToolHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default ToolHistorySlice.reducer;
