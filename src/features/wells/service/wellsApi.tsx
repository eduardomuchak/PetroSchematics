import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL_ENDPOINT = `${process.env.REACT_APP_URL_ENDPOINT}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export const wellsApiSlice = createApi({
  reducerPath: 'wellsApiSlice',
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
  tagTypes: ['Wells'],
  endpoints: (builder) => ({
    getWellsList: builder.query({
      query: (payload) => ({
        url: '/action/find',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['Wells'],
    }),
    addWell: builder.mutation({
      query: (payload) => ({
        url: '/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Wells'],
    }),
    updateWell: builder.mutation({
      query: (payload) => ({
        url: `/action/updateOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Wells'],
    }),
    deleteWell: builder.mutation({
      query: (payload) => ({
        url: `/action/deleteOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Wells'],
    }),
  }),
});

export const { useGetWellsListQuery, useAddWellMutation, useUpdateWellMutation, useDeleteWellMutation } = wellsApiSlice;
