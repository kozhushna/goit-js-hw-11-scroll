import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34313610-1e4a8498015aaf70caf78cfd3';
const PAGE_SIZE = 40;

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.total = 0;
    this.currentImages = 0;
  }

  fetchImages() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PAGE_SIZE}&page=${this.page}`;

    return axios.get(url).then(result => {
      this.incrementPage();
      if (result.data.totalHits === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      this.currentImages += result.data.hits.length;
      this.total = result.data.totalHits;
      return result.data.hits;
    });
  }

  isLastPage() {
    return this.currentImages >= this.total;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
    this.currentImages = 0;
    this.total = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
