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

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditBtn = document.querySelector("#profile-edit-btn");
const modalCloseBtn = document.querySelector("#modal-close-btn");
const profileHeading = document.querySelector("#profile-heading");
const profileSubheading = document.querySelector("#profile-subheading");
const profileHeadingInput = document.querySelector("#modal-heading-input");
const profileSubheadingInput = document.querySelector(
  "#modal-subheading-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardsListEl = document.querySelector(".cards__list");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
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
  closePopup();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditBtn.addEventListener("click", () => {
  profileHeadingInput.value = profileHeading.textContent.trim();
  profileSubheadingInput.value = profileSubheading.textContent.trim();
  profileEditModal.classList.add("modal_opened");
});
modalCloseBtn.addEventListener("click", closePopup);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardsListEl.append(cardElement);
});
