import { configureStore } from '@reduxjs/toolkit';

import { api } from 'services/apiSlice';

import { testeSlice } from './slices/testeSlice';

export const store = configureStore({
  reducer: {
    [testeSlice.name]: testeSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
