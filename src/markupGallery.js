export class Gallery {
  constructor({ imagesContainer }) {
    this.imagesContainer = imagesContainer;
  }
  clearGallery() {
    this.imagesContainer.innerHTML = '';
  }

  renderGallery(images = []) {
    this.imagesContainer.insertAdjacentHTML(
      'beforeend',
      images
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) =>
            `<div class="photo-card">
             <img src="${webformatURL}" alt=${tags}"" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                  <b>Views</b>${views}
                </p>
                <p class="info-item">
                  <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>${downloads}
                </p>
              </div>
            </div>`
        )
        .join('')
    );
  }
}
