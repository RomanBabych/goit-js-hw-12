const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43800208-301c21487611dae4b6f535cf2';

export const fetchImagesByQuery = (queryString = 'pug') => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: queryString,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
