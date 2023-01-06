import { apiMongoDB } from 'features/api/apiMongoDB';

export const configCRUD = apiMongoDB.injectEndpoints({
  endpoints: (builder) => ({
    addSchematicConfig: builder.mutation({
      query: (payload) => ({
        url: '/api/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SquematicConfig'],
    }),
    getSchematicConfig: builder.query({
      query: (payload) => ({
        url: '/api/action/findOne',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['SquematicConfig'],
    }),
    updateSchematicConfig: builder.mutation({
      query: (payload) => ({
        url: `/api/action/updateOne`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['SquematicConfig'],
    }),
    deleteSchematicConfig: builder.mutation({
      query: (payload) => ({
        url: `/api/action/deleteOne`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['SquematicConfig'],
    }),
  }),
});

export const {
  useAddSchematicConfigMutation,
  useGetSchematicConfigQuery,
  useUpdateSchematicConfigMutation,
  useDeleteSchematicConfigMutation,
} = configCRUD;
