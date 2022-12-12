import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from 'features/auth/authSlice';
import { schematicWellSlice } from 'features/schematicWell/schematicWellSlice';

import { apiSlice } from './api/apiSlice';
import { commentsApiSlice } from './schematicWell/service/commentsCRUD';
import { subSurfaceEquipmentApiSlice } from './schematicWell/service/subSurfaceEquimentsCRUD';
import { surfaceEquipmentApiSlice } from './schematicWell/service/surfaceEquimentsCRUD';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [subSurfaceEquipmentApiSlice.reducerPath]: subSurfaceEquipmentApiSlice.reducer,
    [surfaceEquipmentApiSlice.reducerPath]: surfaceEquipmentApiSlice.reducer,
    [commentsApiSlice.reducerPath]: commentsApiSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [schematicWellSlice.name]: schematicWellSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(apiSlice.middleware)
      .concat(subSurfaceEquipmentApiSlice.middleware)
      .concat(surfaceEquipmentApiSlice.middleware)
      .concat(commentsApiSlice.middleware),

  devTools: true,
});
