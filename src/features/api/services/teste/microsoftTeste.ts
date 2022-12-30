import { apiBackend } from '../../apiBackend';

export const testeCRUD = apiBackend.injectEndpoints({
  endpoints: (builder) => ({
    getTeste: builder.query({
      query: () => '/api/describe/coletaAmostrar',
      providesTags: ['MicrosoftToken'],
    }),
  }),
});

export const { useGetTesteQuery } = testeCRUD;
