import { apiMongoDB } from '../../apiMongoDB';

export const surfaceEquipmentsCRUD = apiMongoDB.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetSurfaceEquipmentsQuery,
  useAddSurfaceEquipmentMutation,
  useUpdateSurfaceEquipmentMutation,
  useDeleteSurfaceEquipmentMutation,
  useAddManySurfaceEquipmentsMutation,
} = surfaceEquipmentsCRUD;
