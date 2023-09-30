import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api/';

export const getPosts = async () => {
  const response = await axios.get(`${BASE_URL}planets`);
  return response.data.results;
};

export const searchPosts = async (value: string) => {
  const response = await axios.get(`${BASE_URL}planets/?search=${value}`);
  return response.data.results;
};
