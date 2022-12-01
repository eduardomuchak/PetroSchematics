import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const urlAPI = `${process.env.REACT_APP_API_URL}`;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: urlAPI }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => 'getAll',
    }),
  }),
});

export const { useGetAllQuery } = api;
