import axios from 'axios';
export { fetchImg };
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '31725002 - c4ac72ae045b09ab886bdc0d4';
async function fetchImg(q, page, parePage) {
  const responce = await axios.get(
    '?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=2${parePage}'
  );
  return responce;
}
