export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  renderItems(items) {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(newItem) {
    this._container.prepend(newItem);
  }
}
