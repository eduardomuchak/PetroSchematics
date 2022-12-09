import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from 'features/auth/authSlice';
import { schematicWellSlice } from 'features/schematicWell/schematicWellSlice';

import { apiSlice } from './api/apiSlice';
import { subSurfaceEquipmentApiSlice } from './schematicWell/service';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [subSurfaceEquipmentApiSlice.reducerPath]: subSurfaceEquipmentApiSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [schematicWellSlice.name]: schematicWellSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(apiSlice.middleware)
      .concat(subSurfaceEquipmentApiSlice.middleware),

  devTools: true,
});
