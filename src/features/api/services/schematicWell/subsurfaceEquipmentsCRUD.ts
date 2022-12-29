import { apiMongoDB } from 'features/api/apiMongoDB';
export const subsurfaceEquipmentsCRUD = apiMongoDB.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetSubsurfaceEquipmentsQuery,
  useAddSubsurfaceEquipmentMutation,
  useUpdateSubsurfaceEquipmentMutation,
  useDeleteSubsurfaceEquipmentMutation,
} = subsurfaceEquipmentsCRUD;
