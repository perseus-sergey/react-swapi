import { Params } from 'react-router-dom';
import { store } from '../main';
import { swApi } from '../store/api/api';
import { setQuery } from '../store/slice/searchSlice';

type LoaderParams = { params: Params<string> };
type RequestParams = { request: Request };
type UrlSearchKey = string | undefined | null;

export const loader = async (
  searchText: UrlSearchKey,
  page: UrlSearchKey,
  planetId?: UrlSearchKey
) => {
  const p = store.dispatch(
    planetId
      ? swApi.endpoints.getPlanet.initiate(planetId)
      : swApi.endpoints.searchEndpoint.initiate({ text: searchText || '', page: page || '1' })
  );

  try {
    const response = await p.unwrap();
    store.dispatch(setQuery({ text: searchText || '' }));
    return response || null;
  } catch (e) {
    return null;
  } finally {
    p.unsubscribe();
  }
};

// export const loader = async (search: UrlSearchKey, page: UrlSearchKey, planetId?: UrlSearchKey) => {
//   const urlString = planetId
//     ? `${BASE_URL}/${planetId}`
//     : `${BASE_URL}/?search=${search || ''}&page=${page || 1}`;
//   const res = await fetch(urlString);
//   if (res.status === 404) {
//     throw new Response('Not Found', { status: 404 });
//   }
//   const r = res.json();
//   return r;
// };

export const planetLoader = ({ params }: LoaderParams) => loader(null, null, params.planetId || '');

export const searchLoader = async ({ request }: RequestParams, url = new URL(request.url)) =>
  loader(url.searchParams.get('q'), url.searchParams.get('page') || '1');
