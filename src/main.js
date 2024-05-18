import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImagesByQuery } from './js/pixabay-api.js';
import { createGalleryItemMarkup } from './js/render-functions.js';

const galleryEl = document.querySelector('.gallery');
const searchFormEl = document.querySelector('.search-form');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

let searchQuery = '';
let currentPage = 1;

async function onSearchFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();
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
  currentPage = 1;
  loadMoreBtnEl.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');

  try {
    const imagesData = await fetchImagesByQuery(searchQuery, currentPage);
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
    } else {
      galleryEl.innerHTML = createGalleryItemMarkup(imagesData.hits);
      const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      lightbox.refresh();
      if (imagesData.totalHits > currentPage * 15) {
        loadMoreBtnEl.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    event.target.reset();
    loaderEl.classList.add('is-hidden');
  }
}

async function onLoadMoreBtnClick() {
  currentPage += 1;
  loaderEl.classList.remove('is-hidden');

  try {
    const initialHeight =
      galleryEl.firstElementChild.getBoundingClientRect().height;
    const imagesData = await fetchImagesByQuery(searchQuery, currentPage);
    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryItemMarkup(imagesData.hits)
    );
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();

    window.scrollBy({
      top: initialHeight * 2,
      behavior: 'smooth',
    });
    if (imagesData.totalHits <= currentPage * 15) {
      loadMoreBtnEl.classList.add('is-hidden');
      iziToast.info({
        position: 'topRight',
        transitionIn: 'bounceInLeft',
        message: "We're sorry, but you've reached the end of search results.",
        messageSize: 16,
        timeout: 3000,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderEl.classList.add('is-hidden');
  }
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
