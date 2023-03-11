export class LoadMoreButton {
  constructor({ loadMoreBtn }, hidden = false) {
    this.button = loadMoreBtn;
    hidden && this.hide();
  }

  enable() {
    this.button.disabled = false;
  }

  disable() {
    this.button.disabled = true;
  }

  show() {
    this.button.classList.remove('is-hidden');
  }

  hide() {
    this.button.classList.add('is-hidden');
  }
}
