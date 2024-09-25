/* -------------------------------------------------------------------------- */
/*                               import Scripts                               */
/* -------------------------------------------------------------------------- */
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { initialCards, validationConfig } from "../utils/constants.js";

/* -------------------------------------------------------------------------- */
/*                                   Objects                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Initialization ----------------------------- */

// Store Initial Form Values
const initialFormValues = {};

// Store Form Validators
const formValidators = {};

/* ---------------------------------- Forms --------------------------------- */
const profileEditForm = document.forms["edit-profile-form"];
const addCardForm = document.forms["add-card-form"];

/* --------------------------------- Modals --------------------------------- */

// Edit Profile Modal
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileHeading = document.querySelector("#profile-heading");
const profileSubheading = document.querySelector("#profile-subheading");
const profileHeadingInput = profileEditModal.querySelector(
  "#edit-profile-modal-heading-input"
);
const profileSubheadingInput = profileEditModal.querySelector(
  "#edit-profile-modal-subheading-input"
);

// Add Card Modal
const addCardModal = document.querySelector("#add-card-modal");
const cardFormTitleInput = addCardForm.querySelector(
  "#add-card-modal-title-input"
);
const cardFormUrlInput = addCardForm.querySelector("#add-card-modal-url-input");

// Full Image Modal
const imgModal = document.querySelector("#full-image-modal");
const imgFull = imgModal.querySelector("#full-image-card");
const imgCaption = imgModal.querySelector("#full-image-caption");

// Card Template
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardsListEl = document.querySelector(".cards__list");

// Modal Buttons
const closeButtons = document.querySelectorAll(".modal__close");
const profileEditBtn = document.querySelector("#profile-edit-btn");
const addCardBtn = document.querySelector("#add-card-btn");

/* ----------------------------- Instantiations ----------------------------- */

// Image Modal
const imagePopup = new PopupWithImage("#full-image-modal");

// Profile Modal
const profilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleProfileEditSubmit,
});

// Add Card Modal
const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleAddCardSubmit,
});

// Card Section
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      section.addItem(card);
    },
  },
  ".cards__list"
);

// User Info
const userInfo = new UserInfo({
  name: ".profile__heading",
  about: ".profile__subheading",
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Initializations ---------------------------- */

// Populate Initial Cards
initialCards.forEach((data) => {
  const cardElement = createCard(data);
  cardsListEl.append(cardElement);
});

/* ---------------------------- Open/Close Modal ---------------------------- */

// // Open Modal
// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscKey);
//   document.addEventListener("mousedown", handleOverlayClick);
// }

// // Close Modal
// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscKey);
//   document.removeEventListener("mousedown", handleOverlayClick);
// }

/* --------------------------- Reset Form Validity -------------------------- */

function resetFormValidation(form) {
  const formId = form.getAttribute("id");
  formValidators[formId].resetValidation();
}

/* --------------------------- Create/Add New Card -------------------------- */

// Create New Card Element
function createCard(item) {
  const card = new Card(item, "#card-template", handleImgClick);
  return card.getCardElement();
}

// Add New Card to DOM
function addCard(card) {
  cardsListEl.prepend(card);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

/* -------------------------- Modal Close Handlers -------------------------- */

// // Close Modal on Overlay Click
// function handleOverlayClick(e) {
//   if (e.target.classList.contains("modal_opened")) {
//     closeModal(e.target);
//   }
// }

// // "Esc" Key Close Modal
// function handleEscKey(e) {
//   if (e.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     if (openedModal) {
//       closeModal(openedModal);
//     }
//   }
// }

// // Close Modal Buttons
// closeButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const modal = button.closest(".modal");
//     closeModal(modal);
//   });
// });

/* ----------------------------- Sumbit Handlers ---------------------------- */

// Edit Profile Submit Handler
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileHeading.textContent = profileHeadingInput.value;
  profileSubheading.textContent = profileSubheadingInput.value;
  closeModal(profileEditModal);
}

// Add New Card Submit Handler
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardFormTitleInput.value;
  const link = cardFormUrlInput.value;
  addCard(createCard({ name, link }));
  e.target.reset();
  closeModal(addCardModal);
}

/* -------------------------- Image Preview Handler ------------------------- */

function handleImgClick(data) {
  openModal(imgModal);
  imgFull.src = data.link;
  imgFull.alt = data.name;
  imgCaption.textContent = data.name;
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

/* --------------------------- Edit Profile Modal --------------------------- */

// Profile Edit Button
profileEditBtn.addEventListener("click", () => {
  profileHeadingInput.value = profileHeading.textContent.trim();
  profileSubheadingInput.value = profileSubheading.textContent.trim();

  // openModal(profileEditModal);
  resetFormValidation(profileEditForm);
});

// Profile Edit Form
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* ----------------------------- Add Card Modal ----------------------------- */

// Add Card Button
addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

// Add Card Form
addCardForm.addEventListener("submit", handleAddCardSubmit);

/* --------------------------------- Popups --------------------------------- */

// Full Image Popup
imagePopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                            Configure Validation                            */
/* -------------------------------------------------------------------------- */

/* ------------------------- Enable Form Validation ------------------------- */

function enableValidation(validationConfig) {
  const { formSelector } = validationConfig;
  const formEls = [...document.querySelectorAll(formSelector)];
  formEls.forEach((formEl) => {
    const validator = new FormValidator(validationConfig, formEl);
    const formId = formEl.getAttribute("id");
    formValidators[formId] = validator;
    validator.enableValidation();
  });
}

enableValidation(validationConfig);
