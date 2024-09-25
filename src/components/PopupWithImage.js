import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._fullImage = this._popupElement.querySelector("#full-image-modal");
    this._fullImageTitle = this._popupElement.querySelector("#full-image-card");
  }

  open({ name, link }) {
    super.open();
    this._fullImage.src = link;
    this._fullImage.alt = name;
    this._fullImageTitle.textContent = name;
  }
}