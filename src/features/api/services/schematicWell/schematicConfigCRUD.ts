import { apiMongoDB } from 'features/api/apiMongoDB';

export const configCRUD = apiMongoDB.injectEndpoints({
  endpoints: (builder) => ({
    addSchematicConfig: builder.mutation({
      query: (payload) => ({
        url: '/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SquematicConfig'],
    }),
    getSchematicConfig: builder.query({
      query: (payload) => ({
        url: '/action/findOne',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['SquematicConfig'],
    }),
    updateSchematicConfig: builder.mutation({
      query: (payload) => ({
        url: `/action/updateOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SquematicConfig'],
    }),
    deleteSchematicConfig: builder.mutation({
      query: (payload) => ({
        url: `/action/deleteOne`,
        method: 'POST',
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
