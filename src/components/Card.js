export default class Card {
  constructor(
    data,
    cardSelector,
    handleImgClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._title = data.name;
    this._image = data.link;
    this._id = data._id;

    this._cardSelector = cardSelector;
    this._handleImgClick = handleImgClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = this._getCardElement();

    this._setEventListeners();
    this._updateLikeState();

    this.isLiked = data.isLiked || false;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".cards__button-favorite")
      .addEventListener("click", () => {
        this._handleLikeClick(this);
      });

    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });

    this._cardElement
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleImgClick(this._title, this._image);
      });
  }

  _updateLikeState() {
    this._cardElement
      .querySelector(".cards__button-favorite")
      .classList.toggle("cards__button-favorite_active", this.isLiked);
  }

  _getCardElement() {
    const cardElement =
      this._cardTemplate.content.firstElementChild.cloneNode(true);
    cardElement.querySelector(".cards__title").textContent = this._title;
    cardElement.querySelector(".cards__image").src = this._image;
    cardElement.querySelector(".cards__image").alt = this._title;

    return cardElement;
  }

  getCardElement() {
    return this._cardElement;
  }

  getId() {
    return this._id;
  }

  removeCard() {
    if (this._cardElement) {
      this._cardElement.remove();
      this._cardElement = null;
    } else {
      console.error(this, "is not a card element");
    }
  }

  updateLikedState(isLiked) {
    this.isLiked = isLiked;
    this._updateLikeState();
  }
}
