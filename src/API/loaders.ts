import { Params } from 'react-router-dom';
import { BASE_URL } from '../commons/constants';

export const planetLoader = async ({ params }: { params: Params<string> }) => {
  const res = await fetch(`${BASE_URL}/${params.planetId || ''}`);
  if (res.status === 404) {
    throw new Response('Not Found', { status: 404 });
  }
  return res.json();
};
