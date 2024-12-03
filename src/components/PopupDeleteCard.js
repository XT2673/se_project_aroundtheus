import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector }, onConfirmDeleteAction) {
    super({ popupSelector });
    this._onConfirmDeleteAction = onConfirmDeleteAction;
    this.submitButton = this._popupElement.querySelector(".modal__save");
    this.submitButtonText = this.submitButton.textContent;
  }

  setDeleteConfirmCallback(callback) {
    this._onConfirmDeleteAction = callback;
  }

  _confirmDelete = () => {
    if (typeof this._onConfirmDeleteAction === "function") {
      return this._onConfirmDeleteAction();
    }
    return Promise.resolve();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._confirmDelete()
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.renderLoading(false);
        });
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.submitButton.textContent = "Deleting...";
    } else {
      this.submitButton.textContent = this.submitButtonText;
    }
  }
}
