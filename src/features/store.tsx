import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from 'features/auth/authSlice';
import { schematicWellSlice } from 'features/schematicWell/schematicWellSlice';

import { apiSlice } from './api/apiSlice';
import { microsoftApiSlice } from './service/microsoftApi';
import { apiMongoDB } from './service/apiMongoDB';
import { wellsApiSlice } from './wells/service/wellsApi';
import { wellsSlice } from './wells/wellsSlice';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiMongoDB.reducerPath]: apiMongoDB.reducer,
    [schematicWellSlice.name]: schematicWellSlice.reducer,
    [wellsApiSlice.reducerPath]: wellsApiSlice.reducer,
    [wellsSlice.name]: wellsSlice.reducer,
    [microsoftApiSlice.reducerPath]: microsoftApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(apiSlice.middleware)
      .concat(apiMongoDB.middleware)
      .concat(wellsApiSlice.middleware)
      .concat(microsoftApiSlice.middleware),

  devTools: true,
});
