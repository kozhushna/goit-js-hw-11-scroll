import './css/styles.css';
import getRefs from './getRefs';
import ImagesApiService from './fetchImages';
import { Gallery } from './markupGallery';
import { LoadMoreButton } from './load-more-btn';
import Notiflix from 'notiflix';

const refs = getRefs();
const imagesApiService = new ImagesApiService();
const gallery = new Gallery(refs);
const loadMoreBtn = new LoadMoreButton(refs, true);
refs.searchForm.addEventListener('submit', onSearch);
refs.searchQuery.addEventListener('input', onClear);
loadMoreBtn.button.addEventListener('click', () => searchImages(false));

function onSearch(e) {
  e.preventDefault();

  const searchForm = e.target;
  const searchQuery = searchForm.elements.searchQuery.value.trim();
  gallery.clearGallery();
  if (searchQuery === '') {
    return;
  }
  imagesApiService.query = searchQuery;
  imagesApiService.resetPage();
  searchImages(true);
}

function onFetchError(error) {
  gallery.clearGallery();
  Notiflix.Notify.failure(error.message);
}

function onClear(e) {
  if (e.target.value.trim() === '') {
    gallery.clearGallery();
  }
}

function searchImages(isNew) {
  loadMoreBtn.hide();
  imagesApiService
    .fetchImages()
    .then(images => {
      gallery.renderGallery(images);
      if (isNew) {
        Notiflix.Notify.info(
          `Hooray! We found ${imagesApiService.total} images.`
        );
      }
      if (imagesApiService.isLastPage()) {
        loadMoreBtn.hide();
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        loadMoreBtn.show();
      }
    })
    .catch(onFetchError);
}
