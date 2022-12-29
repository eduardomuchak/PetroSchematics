import { apiMongoDB } from 'features/service/apiMongoDB';
export const commentsCRUD = apiMongoDB.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (payload) => ({
        url: '/action/find',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['SchematicComments'],
    }),
    addComments: builder.mutation({
      query: (payload) => ({
        url: '/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SchematicComments'],
    }),
    updateComments: builder.mutation({
      query: (payload) => ({
        url: `/action/updateOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SchematicComments'],
    }),
    deleteComments: builder.mutation({
      query: (payload) => ({
        url: `/action/deleteOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SchematicComments'],
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentsMutation, useUpdateCommentsMutation, useDeleteCommentsMutation } =
  commentsCRUD;
