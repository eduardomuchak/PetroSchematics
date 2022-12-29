import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL_ENDPOINT = `${process.env.REACT_APP_URL_API_BACKEND}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export const apiBackend = createApi({
  reducerPath: 'apiBackend',
  baseQuery: fetchBaseQuery({
    baseUrl: URL_ENDPOINT,
    prepareHeaders: (headers) => {
      const microsoftToken = sessionStorage.getItem('@Origem:microsoftToken');

      headers.set('api-key', API_KEY);
      headers.set('Access-Control-Request-Headers', '*');
      if (microsoftToken) {
        headers.set('Authorization', `Bearer ${microsoftToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['MicrosoftToken'],
  endpoints: (builder) => ({
    getTeste: builder.query({
      query: () => '/api/describe/coletaAmostrar',
      providesTags: ['MicrosoftToken'],
    }),
  }),
});

export const { useGetTesteQuery } = apiBackend;
