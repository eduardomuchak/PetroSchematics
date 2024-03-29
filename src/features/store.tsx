import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from 'features/auth/authSlice';
import { schematicWellSlice } from 'features/schematicWell/schematicWellSlice';

import { apiBackend } from './api/apiBackend';
import { apiMongoDB } from './api/apiMongoDB';
import { wellsSlice } from './wells/wellsSlice';

export const store = configureStore({
  reducer: {
    // API's
    [apiBackend.reducerPath]: apiBackend.reducer,
    [apiMongoDB.reducerPath]: apiMongoDB.reducer,

    // Reducers/Slices
    [authSlice.name]: authSlice.reducer,
    [schematicWellSlice.name]: schematicWellSlice.reducer,
    [wellsSlice.name]: wellsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(apiMongoDB.middleware)
      .concat(apiBackend.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
