import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL_ENDPOINT = `${process.env.REACT_APP_URL_API_MONGODB}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export const apiMongoDB = createApi({
  reducerPath: 'apiMongoDB',
  baseQuery: fetchBaseQuery({
    baseUrl: URL_ENDPOINT,
    prepareHeaders: (headers, { getState }: any) => {
      headers.set('api-key', API_KEY);
      headers.set('Access-Control-Request-Headers', '*');
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['SurfaceEquipment', 'SubsurfaceEquipment', 'SchematicComments', 'SquematicConfig', 'Wells'],
  endpoints: () => ({}),
});
