import { apiMongoDB } from '../../apiMongoDB';

export const surfaceEquipmentsCRUD = apiMongoDB.injectEndpoints({
  endpoints: (builder) => ({
    getSurfaceEquipments: builder.query({
      query: (payload) => ({
        url: '/api/action/find',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['SurfaceEquipment'],
    }),
    addSurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: '/api/action/insertOne',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
    updateSurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: `/api/action/updateOne`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
    deleteSurfaceEquipment: builder.mutation({
      query: (payload) => ({
        url: `/api/action/deleteOne`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
    addManySurfaceEquipments: builder.mutation({
      query: (payload) => ({
        url: '/api/action/insertMany',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['SurfaceEquipment'],
    }),
  }),
});

export const {
  useGetSurfaceEquipmentsQuery,
  useAddSurfaceEquipmentMutation,
  useUpdateSurfaceEquipmentMutation,
  useDeleteSurfaceEquipmentMutation,
  useAddManySurfaceEquipmentsMutation,
} = surfaceEquipmentsCRUD;
