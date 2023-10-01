import axios from 'axios';
import { storageGetQuery } from '../commons/utils';
import { IGetPosts } from '../types';

const BASE_URL = 'https://swapi.dev/api/';

export const getPosts = async (): Promise<IGetPosts> => {
  const storageQuery = storageGetQuery();
  if (storageQuery) {
    return searchPosts(storageQuery);
  }
  const response = await axios.get(`${BASE_URL}planets`);
  return { posts: response.data.results, postsCount: response.data.count };
};

export const searchPosts = async (value: string): Promise<IGetPosts> => {
  if (!value) return getPosts();

  const response = await axios.get(`${BASE_URL}planets/?search=${value}`);
  return { posts: response.data.results, postsCount: response.data.count };
};
