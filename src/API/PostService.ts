import axios from 'axios';
import { storageGetQuery } from '../commons/utils';
import { IGetPosts } from '../types';

const BASE_URL = 'https://swapi.dev/api/planets';

export const getPosts = async (url = BASE_URL): Promise<IGetPosts> => {
  const storageQuery = storageGetQuery();
  if (storageQuery) {
    return searchPosts(storageQuery);
  }
  const response = await axios.get(url);
  return {
    posts: response.data.results,
    postsCount: response.data.count,
    nextPage: response.data.next,
  };
};

export const searchPosts = async (value: string): Promise<IGetPosts> => {
  const searchValue = value.trim();

  if (!searchValue) return getPosts();

  const response = await axios.get(`${BASE_URL}/?search=${searchValue}`);
  return {
    posts: response.data.results,
    postsCount: response.data.count,
    nextPage: response.data.next,
  };
};
