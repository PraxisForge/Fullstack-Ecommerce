import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  id?: string | number;
  email?: string;
  name?: string;
  [key: string]: unknown;
}

interface UserState {
  userInfo: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userInfo: null,
  token: localStorage.getItem('access_token'), // Check local storage on load
  isAuthenticated: !!localStorage.getItem('access_token'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; access: string; refresh: string }>) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.access;
      state.isAuthenticated = true;
      // Save to local storage so they stay logged in
      localStorage.setItem('access_token', action.payload.access);
      localStorage.setItem('refresh_token', action.payload.refresh);
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;