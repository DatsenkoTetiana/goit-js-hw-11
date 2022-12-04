import axios from 'axios';
export { fetchImages };

axios.defaults.baseURL = `https://pixabay.com/api/`;
const KEY = '31725002-c4ac72ae045b09ab886bdc0d4';

async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&horizontal=true&page=${page}&per_page=${perPage}`
  );

  return response;
}
