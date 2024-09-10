import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: 'dark',
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
