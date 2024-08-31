import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 0,
};

const progressBarMemuSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setStep } = progressBarMemuSlice.actions;

export default progressBarMemuSlice.reducer;
