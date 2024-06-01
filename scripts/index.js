/* -------------------------------------------------------------------------- */
/*                                 Card Array                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

// Edit Profile Modal
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
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
const addCardForm = addCardModal.querySelector(".modal__form");
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
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileCloseBtn = profileEditModal.querySelector(".modal__close");
const addCardBtn = document.querySelector("#add-card-btn");
const addcardCloseBtn = addCardModal.querySelector(".modal__close");
const imgCloseBtn = imgModal.querySelector(".modal__close");
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
  const favBtn = cardElement.querySelector(".cards__button-favorite");
  const deleteBtn = cardElement.querySelector(".cards__delete-button");

  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(imgModal);
    imgFull.src = cardImageEl.src;
    imgFull.alt = cardImageEl.alt;
    imgCaption.textContent = data.name;
  });

  favBtn.addEventListener("click", () => {
    favBtn.classList.toggle("cards__button-favorite_active");
  });

  imgCloseBtn.addEventListener("click", () => {
    closeModal(imgModal);
  });

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileHeading.textContent = profileHeadingInput.value;
  profileSubheading.textContent = profileSubheadingInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardFormTitleInput.value;
  const link = cardFormUrlInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardsListEl.prepend(cardElement);
  addCardForm.reset();
  closeModal(addCardModal);
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardsListEl.append(cardElement);
});

// Edit Profile Modal
profileEditBtn.addEventListener("click", () => {
  profileHeadingInput.value = profileHeading.textContent.trim();
  profileSubheadingInput.value = profileSubheading.textContent.trim();
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

profileCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

// Add Card Modal
addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

addcardCloseBtn.addEventListener("click", () => {
  closeModal(addCardModal);
});
