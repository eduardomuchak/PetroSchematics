import { apiMongoDB } from 'features/api/apiMongoDB';
export const commentsCRUD = apiMongoDB.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (payload) => ({
        url: '/api/action/find',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['SchematicComments'],
    }),
    addComments: builder.mutation({
      query: (payload) => ({
        url: '/api/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SchematicComments'],
    }),
    updateComments: builder.mutation({
      query: (payload) => ({
        url: `/api/action/updateOne`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['SchematicComments'],
    }),
    deleteComments: builder.mutation({
      query: (payload) => ({
        url: `/api/action/deleteOne`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['SchematicComments'],
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentsMutation, useUpdateCommentsMutation, useDeleteCommentsMutation } =
  commentsCRUD;
