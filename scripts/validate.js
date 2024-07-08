/* -------------------------------------------------------------------------- */
/*                              Validation Object                             */
/* -------------------------------------------------------------------------- */
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                        Input Error Toggle Functions                        */
/* -------------------------------------------------------------------------- */
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

/* -------------------------------------------------------------------------- */
/*                        Toggle Submit Button                                */
/* -------------------------------------------------------------------------- */
function toggleButtonState(
  inputEls,
  formEl,
  { submitButtonSelector, inactiveButtonClass }
) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });

  const buttonEl = formEl.querySelector(submitButtonSelector);

  console.log("Button:", buttonEl);
  console.log("Found Invalid:", foundInvalid);
  console.log("Inactive Button Class:", inactiveButtonClass);

  if (foundInvalid) {
    buttonEl.classList.add(inactiveButtonClass);
    buttonEl.disabled = true;
  } else {
    buttonEl.classList.remove(inactiveButtonClass);
    buttonEl.disabled = false;
  }
}

/* -------------------------------------------------------------------------- */
/*                         Set Event Listener Function                        */
/* -------------------------------------------------------------------------- */
function setEventListeners(formEl, config) {
  const { inputSelector } = config;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];

  // Initial state verification
  inputEls.forEach((inputEl, index) => {
    console.log(`Input ${index} valid: ${inputEl.validity.valid}`);
  });

  toggleButtonState(inputEls, formEl, config);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputEls, formEl, config);
    });
  });
}

/* -------------------------------------------------------------------------- */
/*                         Check Input Validity                               */
/* -------------------------------------------------------------------------- */
function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

/* -------------------------------------------------------------------------- */
/*                         Enable Validation                                  */
/* -------------------------------------------------------------------------- */
function enableValidation(config) {
  const formEls = [...document.querySelectorAll(config.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, config);
  });
}

/* ------------------------------ Validate it! ------------------------------ */
enableValidation(config);
