import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43800208-301c21487611dae4b6f535cf2';

export const fetchImagesByQuery = async (queryString = 'pug', page = 1) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: queryString,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  });
  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  try {
    return response.data;
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};
