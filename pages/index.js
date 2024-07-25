/* -------------------------------------------------------------------------- */
/*                               import Scripts                               */
/* -------------------------------------------------------------------------- */
import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";
/* -------------------------------------------------------------------------- */
/*                                   Objects                                  */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Card ---------------------------------- */
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* ----------------------- Valididation Configuration ----------------------- */

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Initialization ----------------------------- */

// Store Initial Form Values
const initialFormValues = {};

// Store Form Validators
const formValidators = {};

const modal = document.querySelector(".modal");
const form = modal.querySelector(".modal__form");
const formId = form.getAttribute("id");

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

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Initializations ---------------------------- */

// Populate Initial Cards
initialCards.forEach((data) => {
  const cardElement = createCard(data);
  cardsListEl.append(cardElement);
});

// Store Initial Form Values
function storeInitialValues(formId, formElement) {
  const values = {};
  formElement.querySelectorAll("input, textarea").forEach((input) => {
    values[input.name] = input.value;
  });
  initialFormValues[formId] = values;
}

/* ---------------------------- Open/Close Modal ---------------------------- */

// Open Modal
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
  document.addEventListener("mousedown", handleOverlayClick);

  if (form) {
    if (formId && !initialFormValues[formId]) {
      storeInitialValues(formId, form);
    }
    if (formValidators[formId]) {
      formValidators[formId].resetValidation();
    }
  }
}

// Close Modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
  document.removeEventListener("mousedown", handleOverlayClick);

  resetForm(modal);

  if (formId && formValidators[formId]) {
    formValidators[formId].resetValidation();
  }
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

/* --------------------- Reset Form Imputs and Validity --------------------- */
function resetForm() {
  if (!form) return;

  if (!formId || !initialFormValues[formId]) return;

  // Restore initial values
  const initialValues = initialFormValues[formId];
  form.reset();
  form.querySelectorAll("input, textarea").forEach((input) => {
    if (initialValues[input.name] !== undefined) {
      input.value = initialValues[input.name];
    }

    input.dispatchEvent(new Event("input"));
  });

  if (formValidators && formValidators[formId]) {
    formValidators[formId].resetValidation();
    formValidators[formId]._toggleButtonState();
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

/* -------------------------- Modal Close Handlers -------------------------- */

// Close Modal on Overlay Click
function handleOverlayClick(e) {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(e.target);
  }
}

// "Esc" Key Close Modal
function handleEscKey(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Close Modal Buttons
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

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

  if (formId) {
    storeInitialValues(formId, form);
  }

  openModal(profileEditModal);
});

// Profile Edit Form
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* ----------------------------- Add Card Modal ----------------------------- */

// Add Card Button
addCardBtn.addEventListener("click", () => {
  cardFormTitleInput.value = "";
  cardFormUrlInput.value = "";
  openModal(addCardModal);
});

// Add Card Form
addCardForm.addEventListener("submit", handleAddCardSubmit);

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
