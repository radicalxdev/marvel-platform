import { createSlice } from '@reduxjs/toolkit';

import { THEME_CONFIGS } from '@/constants/onboarding';

const initialState = {
  data: THEME_CONFIGS.dark,
};

const themeData = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { updateTheme } = themeData.actions;

export default themeData.reducer;
