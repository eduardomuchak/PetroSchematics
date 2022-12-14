import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from 'features/auth/authSlice';
import { schematicWellSlice } from 'features/schematicWell/schematicWellSlice';

import { apiSlice } from './api/apiSlice';
import { schematicWellApiSlice } from './schematicWell/service/schematicWellApi';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [schematicWellApiSlice.reducerPath]: schematicWellApiSlice.reducer,
    [schematicWellSlice.name]: schematicWellSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(apiSlice.middleware)
      .concat(schematicWellApiSlice.middleware),

  devTools: true,
});
