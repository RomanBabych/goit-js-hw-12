import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImagesByQuery } from './js/pixabay-api.js';
import { createGalleryItemMarkup } from './js/render-functions.js';

const galleryEl = document.querySelector('.gallery');
const searchFormEl = document.querySelector('.search-form');
const loaderEl = document.querySelector('.loader');

function onSearchFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();
  if (searchQuery === '') {
    galleryEl.innerHTML = '';
    event.target.reset();
    iziToast.warning({
      position: 'topRight',
      transitionIn: 'bounceInLeft',
      message: 'input field cannot be empty',
      messageSize: 16,
      timeout: 3000,
    });
    return;
  }

  galleryEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');

  fetchImagesByQuery(searchQuery)
    .then(imagesData => {
      if (imagesData.total === 0) {
        event.target.reset();
        iziToast.error({
          position: 'topRight',
          transitionIn: 'bounceInLeft',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageSize: 16,
          timeout: 3000,
        });
      }
      const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      galleryEl.innerHTML = createGalleryItemMarkup(imagesData.hits);
      lightbox.refresh();
    })
    .catch(error => error)
    .finally(() => {
      event.target.reset();
      loaderEl.classList.add('is-hidden');
    });
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
