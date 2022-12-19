import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL_ENDPOINT = `${process.env.REACT_APP_URL_ENDPOINT}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export const schematicWellApiSlice = createApi({
  reducerPath: 'schematicWellApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: URL_ENDPOINT,
    prepareHeaders: (headers, { getState }: any) => {
      headers.set('api-key', API_KEY);
      headers.set('Access-Control-Request-Headers', '*');
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['SurfaceEquipment', 'SubsurfaceEquipment', 'SchematicComments', 'SquematicConfig'],
  endpoints: (builder) => ({
    // Equipamentos de Superfície
    getSurfaceEquipments: builder.query({
      query: (payload) => ({
        url: '/action/find',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['SurfaceEquipment'],
    }),
    addSurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: '/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
    updateSurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: `/action/updateOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
    deleteSurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: `/action/deleteOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
    addManySurfaceEquipments: builder.mutation({
      query: (payload) => ({
        url: '/action/insertMany',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
    // Equipamentos de Subsuperfície
    getSubsurfaceEquipments: builder.query({
      query: (payload) => ({
        url: '/action/find',
        method: 'POST',
        body: payload,
      }),
      // transformResponse: (res: any) => res.sort((a: any, b: any) => b.depth - a.depth),
      providesTags: ['SubsurfaceEquipment'],
    }),
    addSubsurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: '/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SubsurfaceEquipment'],
    }),
    updateSubsurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: `/action/updateOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SubsurfaceEquipment'],
    }),
    deleteSubsurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: `/action/deleteOne`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SubsurfaceEquipment'],
    }),
    // Comentários
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
    // Configuração do esquematico
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
  }),
});

export const {
  useGetSurfaceEquipmentsQuery,
  useAddSurfaceEquipmentMutation,
  useUpdateSurfaceEquipmentMutation,
  useDeleteSurfaceEquipmentMutation,
  useAddManySurfaceEquipmentsMutation,
  useGetSubsurfaceEquipmentsQuery,
  useAddSubsurfaceEquipmentMutation,
  useUpdateSubsurfaceEquipmentMutation,
  useDeleteSubsurfaceEquipmentMutation,
  useGetCommentsQuery,
  useAddCommentsMutation,
  useUpdateCommentsMutation,
  useDeleteCommentsMutation,
  useAddSchematicConfigMutation,
  useGetSchematicConfigQuery,
  useUpdateSchematicConfigMutation,
} = schematicWellApiSlice;
