import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../commons/constants';

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: BASE_URL,
    }),
    { maxRetries: 1 }
  ),
  endpoints: (builder) => ({
    searchEndpoint: builder.query({
      query: ({ text = '', page = 1 }) => `/?search=${text}&page=${page}`,
      extraOptions: { maxRetries: 3 },
    }),
    getPlanet: builder.query({ query: (planetId) => `${planetId}` }),
  }),
});

export const { useGetPlanetQuery, useSearchEndpointQuery } = swApi;
export type SearchEndpointQuery = typeof useSearchEndpointQuery;
