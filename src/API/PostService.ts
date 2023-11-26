import { BASE_URL } from '../commons/constants';
import { storageGetQuery } from '../commons/utils';
import { IApiResponse } from '../types';

const fetchData = async (url: string): Promise<IApiResponse> => {
  const response = await fetch(url);
  return await response.json();
};

export const getPosts = async (url = BASE_URL): Promise<IApiResponse> => {
  if (url !== BASE_URL) return fetchData(url);

  const storageQuery = storageGetQuery();
  if (storageQuery) {
    return searchPosts(storageQuery);
  }
  return fetchData(url);
};

export const searchPosts = async (value: string): Promise<IApiResponse> => {
  const searchValue = value.trim();

  if (!searchValue) return getPosts();

  return fetchData(`${BASE_URL}/?search=${searchValue}`);
};
