import { HYDRATE } from 'next-redux-wrapper';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../commons/constants';

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: BASE_URL,
    }),
    { maxRetries: 2 }
  ),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    searchEndpoint: builder.query({
      query: ({ text = '', page = 1 }) => `/?search=${text}&page=${page}`,
      extraOptions: { maxRetries: 3 },
    }),
    getPlanet: builder.query({ query: (planetId) => `${planetId}` }),
  }),
});

export const {
  useGetPlanetQuery,
  useSearchEndpointQuery,
  util: { getRunningQueriesThunk },
} = swApi;
export type SearchEndpointQuery = typeof useSearchEndpointQuery;

// export endpoints for use in SSR
export const { searchEndpoint, getPlanet } = swApi.endpoints;
