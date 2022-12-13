import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL_ENDPOINT = `${process.env.REACT_APP_URL_ENDPOINT}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export const surfaceEquipmentApiSlice = createApi({
  reducerPath: 'surfaceEquipmentApiSlice',
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
  tagTypes: ['SurfaceEquipment'],
  endpoints: (builder) => ({
    getSurfaceEquipments: builder.query({
      query: (payload) => ({
        url: '/action/find',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['SurfaceEquipment'],
    }),
    addSurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: '/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
    updateSurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: `/action/updateOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
    deleteSurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: `/action/deleteOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
    addManySurfaceEquipments: builder.mutation({
      query: (payload) => ({
        url: '/action/insertMany',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
  }),
});

export const {
  useGetSurfaceEquipmentsQuery,
  useAddSurfaceEquipmentMutation,
  useUpdateSurfaceEquipmentMutation,
  useDeleteSurfaceEquipmentMutation,
  useAddManySurfaceEquipmentsMutation,
} = surfaceEquipmentApiSlice;
