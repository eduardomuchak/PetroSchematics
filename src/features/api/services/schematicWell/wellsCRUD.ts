import { apiMongoDB } from '../../apiMongoDB';

export const wellsCRUD = apiMongoDB.injectEndpoints({
  endpoints: (builder) => ({
    getWellsList: builder.query({
      query: (payload) => ({
        url: '/api/action/find',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['Wells'],
    }),
    addWell: builder.mutation({
      query: (payload) => ({
        url: '/api/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Wells'],
    }),
    updateWell: builder.mutation({
      query: (payload) => ({
        url: `/api/action/updateOne`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Wells'],
    }),
    deleteWell: builder.mutation({
      query: (payload) => ({
        url: `/api/action/deleteOne`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['Wells'],
    }),
  }),
});

export const { useGetWellsListQuery, useAddWellMutation, useUpdateWellMutation, useDeleteWellMutation } = wellsCRUD;
