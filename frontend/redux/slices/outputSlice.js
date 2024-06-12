import { createSlice } from '@reduxjs/toolkit';

import fetchOutput from '../thunks/output';

const initialState = {
  loading: true,
  outputs: [],
  error: null,
};

const output = createSlice({
  name: 'output',
  initialState,
  reducers: {
    reset: () => initialState,
    add: (state, action) => {
      state.outputs = state.outputs.concat(action.payload);
    },
    update: (state, action) => {
      let newOut = [];
      state.outputs.forEach((i) => {
        if (i.id === action.payload.id) {
          newOut = newOut.concat(action.payload);
        } else {
          newOut = newOut.concat(i);
        }
      });
      state.outputs = newOut;
    },
    del: (state, action) => {
      let newOut = [];
      state.outputs.forEach((i) => {
        if (i.id !== action.payload.id) {
          newOut = newOut.concat(i);
        }
      });
      state.outputs = newOut;
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchOutput.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchOutput.fulfilled, (state, action) => {
          state.output = action.payload;
          state.loading = false;
        })
        .addCase(fetchOutput.rejected, (state) => {
          state.error = 'Could not get tools';
          state.loading = false;
        });
    },
  },
});

export const { reset, add, update, del } = output.actions;

export default output.reducer;
