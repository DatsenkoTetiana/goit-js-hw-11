import './css/styles.css';
import { fetchImages } from './js/fetchImg';
import { renderGallery } from './js/renger-gallery';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');

let q = '';
let page = 1;
const perPage = 40;
let simpleLightBox;

const options = {
  root: null,
  rootMargin: '250px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(onLoad, options);
searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  q = e.currentTarget.searchQuery.value.trim();

  if (q === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }

  fetchImages(q, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        renderGallery(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        observer.observe(guard);
      }
    })
    .catch(err => console.log(err));
}

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      fetchImages(q, page, perPage)
        .then(({ data }) => {
          renderGallery(data.hits);
          simpleLightBox = new SimpleLightbox('.gallery a').refresh();
          if (data.page === data.totalHits) {
            observer.unobserve(guard);
          }
        })
        .catch(err => {
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
          observer.unobserve(guard);
        });
    }
  });
  console.log(entries);
}
