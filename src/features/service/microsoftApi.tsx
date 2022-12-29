import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL_ENDPOINT = `${process.env.REACT_APP_URL_ENDPOINT_BACKEND}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export const microsoftApiSlice = createApi({
  reducerPath: 'microsoftApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: URL_ENDPOINT,
    prepareHeaders: (
      headers,
      // { getState }: any
    ) => {
      headers.set('api-key', API_KEY);
      headers.set('Access-Control-Request-Headers', '*');
      // const token = getState().auth.microsoftToken;
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      const microsoftToken = sessionStorage.getItem('@Origem:microsoftToken');
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

export const { useGetTesteQuery } = microsoftApiSlice;
