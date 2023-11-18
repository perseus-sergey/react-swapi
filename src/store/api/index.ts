import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../commons/constants';

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAll: builder.query({ query: () => '/' }),
  }),
});

export const { useGetAllQuery } = swApi;
