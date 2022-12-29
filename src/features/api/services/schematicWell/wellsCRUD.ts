import { apiMongoDB } from '../../apiMongoDB';

export const wellsCRUD = apiMongoDB.injectEndpoints({
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

export const { useGetWellsListQuery, useAddWellMutation, useUpdateWellMutation, useDeleteWellMutation } = wellsCRUD;
