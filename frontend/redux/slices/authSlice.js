import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: true,
  error: null,
  showSignupSuccessNotification: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEmailVerified: (state, action) => {
      if (state.data) state.data.emailVerified = action.payload;
    },
    setClaims: (state, action) => {
      if (state.data) state.data.claims = action.payload;
    },
    setTotalUsers: (state, action) => {
      if (state.data) state.data.totalUsers = action.payload;
    },
    setShowSignupSuccessNotification: (state, action) => {
      state.showSignupSuccessNotification = action.payload;
    },
  },
});

export const {
  setLoading,
  setUser,
  setEmailVerified,
  setTotalUsers,
  setClaims,
  setShowSignupSuccessNotification,
} = authSlice.actions;

export default authSlice.reducer;
