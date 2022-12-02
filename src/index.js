import './css/styles.css';
import { fetchImg } from './js/fetchImg';
import { renderGallery } from './js/renger-gallery';

import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let getEl = selector => document.querySelector(selector);
const searchForm = getEl('#search-form');
const btnLoad = getEl('.load-more');
const quard = getEl('.quard');
const galleryEl = getEl('.gallery');

let perPage = 40;
let page = 1;
let SimpleLightbox;
let q = '';

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

searchForm.addEventListener('submit', onSubmit);
const observer = new IntersectionObserver(onLoad, options);

async function onSubmit(e) {
  e.prevenrDefault();
  gallery.innerHTML = '';
  page = 1;
  q = e.currentTarget.searchQuery.value.trim();

  fetchImages(q, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        renderGallery(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        observer.observe(refs.guard);
      }
    })
    .catch(error => console.log(error));
}
function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isInterseting) {
      page += 1;
      fetchImages(q, page, perPage).then(({ data }) => {
        renderGallery(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();

        if (data.page === data.totalHits) {
          Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
          observer.unobserve(quard);
        }
      });
    }
  });
  console.log(entries);
}
