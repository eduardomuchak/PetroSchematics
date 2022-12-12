import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL_ENDPOINT = `${process.env.REACT_APP_URL_ENDPOINT}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export const subSurfaceEquipmentApiSlice = createApi({
  reducerPath: 'subSurfaceEquipmentApiSlice',
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
  tagTypes: ['SubsurfaceEquipment'],
  endpoints: (builder) => ({
    getSubsurfaceEquipments: builder.query({
      query: (payload) => ({
        url: '/action/find',
        method: 'POST',
        body: payload,
      }),
      // transformResponse: (res: any) => res.sort((a: any, b: any) => b.depth - a.depth),
      providesTags: ['SubsurfaceEquipment'],
    }),
    addSubsurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: '/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SubsurfaceEquipment'],
    }),
    updateSubsurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: `/action/updateOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SubsurfaceEquipment'],
    }),
    deleteSubsurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: `/action/deleteOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SubsurfaceEquipment'],
    }),
  }),
});

export const {
  useGetSubsurfaceEquipmentsQuery,
  useAddSubsurfaceEquipmentMutation,
  useUpdateSubsurfaceEquipmentMutation,
  useDeleteSubsurfaceEquipmentMutation,
} = subSurfaceEquipmentApiSlice;
