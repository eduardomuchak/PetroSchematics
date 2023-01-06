import { createSlice } from '@reduxjs/toolkit';

interface UserInfo {
  id?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  perfil?: string;
  avatar?: string;
  nome_role?: string;
  role_id?: number;
}

interface AuthValue {
  user: UserInfo | null;
  token: string | null;
  tokenMicrosoft: string | null;
}

interface AuthState {
  auth: AuthValue;
}

const initialState = { user: null, tokenMicrosoft: null, token: null } as AuthValue;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
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
    setTokenMicrosoft: (state, action) => {
      state.tokenMicrosoft = action.payload;
    },
  },
});

export const { setCredentials, logOut, setTokenMicrosoft } = authSlice.actions;

export const authState = (state: AuthState) => state.auth;

export const selectCurrentUser = (state: AuthState) => state.auth.user;
export const selectCurrentToken = (state: AuthState) => state.auth.token;
export const selectMicrosfotToken = (state: AuthState) => state.auth.tokenMicrosoft;
