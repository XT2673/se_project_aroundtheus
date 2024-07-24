export default class Card {
  constructor(data, cardSelector, handleImgClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImgClick = handleImgClick;

    this._cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = this._getCardElement();
    this._likeButton = this._cardElement.querySelector(
      ".cards__button-favorite"
    );
    this._deleteButton = this._cardElement.querySelector(
      ".cards__delete-button"
    );

    this._setEventListeners();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImgClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("cards__button-favorite_active");
  }

  _handleDeleteClick() {
    this._cardElement.remove();
  }

  _getCardElement() {
    const cardElement =
      this._cardTemplate.content.firstElementChild.cloneNode(true);
    this._cardTitleEl = cardElement.querySelector(".cards__title");
    this._cardImageEl = cardElement.querySelector(".cards__image");
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    return cardElement;
  }

  getCardElement() {
    return this._cardElement;
  }
}
