export default function getRefs() {
  return {
    searchForm: document.querySelector('#search-form'),
    submitBtn: document.querySelector('button[type="submit"]'),
    imagesContainer: document.querySelector('.gallery'),
    searchQuery: document.querySelector('input[name="searchQuery"]'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.photo-card'),
  };
}
