import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../commons/constants';

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPlanet: builder.query({ query: (planetId) => `${planetId}` }),
    search: builder.query({ query: ({ text = '', page = 1 }) => `/?search=${text}&page=${page}` }),
  }),
});

export const { useGetPlanetQuery, useSearchQuery } = swApi;
