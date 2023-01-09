import { apiBackend } from '../../apiBackend';

export const userCRUD = apiBackend.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<any, { code: string | null }>({
      query: (arg) => {
        const { code } = arg;
        return {
          url: '/api/user',
          params: { code },
        };
      },
    }),
  }),
});

export const { useGetUserInfoQuery } = userCRUD;
