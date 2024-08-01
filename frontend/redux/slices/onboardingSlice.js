import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
  completed: false,
  tempData: {},
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    reset: () => initialState,
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
    setTempData: (state, action) => {
      state.tempData = { ...state.tempData, ...action.payload };
    },
    clearTempData: (state) => {
      state.tempData = {};
    },
  },
});

export const { reset, setStep, setCompleted, setTempData, clearTempData } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
