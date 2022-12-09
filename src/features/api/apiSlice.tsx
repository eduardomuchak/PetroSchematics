import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from 'features/auth/authSlice';

const urlAPI = `${process.env.REACT_APP_API_URL}`;

const baseQuery = fetchBaseQuery({
  baseUrl: urlAPI,
  credentials: 'include',
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
