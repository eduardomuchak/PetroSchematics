import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL_ENDPOINT = `${process.env.REACT_APP_URL_API_BACKEND}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export const apiMongoDB = createApi({
  reducerPath: 'apiMongoDB',
  baseQuery: fetchBaseQuery({
    baseUrl: URL_ENDPOINT,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;

      headers.set('Content-Type', 'application/json');
      headers.set('api-key', API_KEY);
      headers.set('Access-Control-Request-Headers', '*');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['SurfaceEquipment', 'SubsurfaceEquipment', 'SchematicComments', 'SquematicConfig', 'Wells'],
  endpoints: () => ({}),
});
