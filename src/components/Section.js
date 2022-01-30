export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach((item) => this.addItem(this._renderer(item)));
  }

  addItem(item) {
    this._selector.prepend(item);
  }
};
