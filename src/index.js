import './css/styles.css';
import getRefs from './getRefs';
import ImagesApiService from './fetchImages';
import { Gallery } from './markupGallery';
import { LoadMoreButton } from './load-more-btn';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();
const imagesApiService = new ImagesApiService();
const gallery = new Gallery(refs);
const loadMoreBtn = new LoadMoreButton(refs, true);

const lightbox = new SimpleLightbox('.photo-card a');

refs.searchForm.addEventListener('submit', onSearch);
refs.searchQuery.addEventListener('input', onClear);
loadMoreBtn.button.addEventListener('click', () => searchImages(true));

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
  searchImages(false);
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

async function searchImages(showMore) {
  loadMoreBtn.hide();
  try {
    const images = await imagesApiService.fetchImages();
    gallery.renderGallery(images);
    lightbox.refresh();

    if (!showMore) {
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
    if (showMore) {
      scroll();
    }
  } catch (error) {
    onFetchError(error);
  }
}

function scroll() {
  const { height: cardHeight } =
    refs.imagesContainer.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
