import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL_ENDPOINT = `${process.env.REACT_APP_URL_ENDPOINT}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export const schematicWellApiSlice = createApi({
  reducerPath: 'schematicWellApiSlice',
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
  tagTypes: ['SurfaceEquipment', 'SubsurfaceEquipment', 'SchematicComments', 'SquematicConfig'],
  endpoints: (builder) => ({
    addSchematicConfig: builder.mutation({
      query: (payload) => ({
        url: '/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SquematicConfig'],
    }),
    getSchematicConfig: builder.query({
      query: (payload) => ({
        url: '/action/findOne',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['SquematicConfig'],
    }),
    updateSchematicConfig: builder.mutation({
      query: (payload) => ({
        url: `/action/updateOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SquematicConfig'],
    }),
  }),
});

export const { useAddSchematicConfigMutation, useGetSchematicConfigQuery, useUpdateSchematicConfigMutation } =
  schematicWellApiSlice;
