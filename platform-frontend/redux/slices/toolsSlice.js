import { createSlice } from '@reduxjs/toolkit';

import fetchTools from '../thunks/tools';

const initialState = {
  data: null,
  loading: true,
  error: null,
};

const tools = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    reset: () => initialState,
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

export const { reset } = tools.actions;

export default tools.reducer;
