import { createSlice } from '@reduxjs/toolkit';

interface AuthValue {
  user: string | null;
  token: string | null;
}

interface AuthState {
  auth: AuthValue;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthValue,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;

export const selectCurrentUser = (state: AuthState) => state.auth.user;
export const selectCurrentToken = (state: AuthState) => state.auth.token;
