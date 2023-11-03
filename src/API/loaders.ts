import { Params } from 'react-router-dom';
import { BASE_URL } from '../commons/constants';

type LoaderParams = { params: Params<string> };
type UrlSearchKey = string | undefined | null;

export const loader = async (search: UrlSearchKey, page: UrlSearchKey, planetId?: UrlSearchKey) => {
  const urlString = planetId
    ? `${BASE_URL}/${planetId}`
    : `${BASE_URL}/?search=${search || ''}&page=${page || 1}`;
  const res = await fetch(urlString);
  if (res.status === 404) {
    throw new Response('Not Found', { status: 404 });
  }
  const r = res.json();
  return r;
};

export const planetLoader = ({ params }: LoaderParams) => loader(null, null, params.planetId || '');
