/* -------------------------------------------------------------------------- */
/*                              Validation Object                             */
/* -------------------------------------------------------------------------- */

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                            Input Error Functions                           */
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
/*                         Check Input Validity                               */
/* -------------------------------------------------------------------------- */
function checkInputValidity(formEl, inputEl, validationConfig) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, validationConfig);
  } else {
    hideInputError(formEl, inputEl, validationConfig);
  }
}

/* -------------------------------------------------------------------------- */
/*                        Toggle Submit Button                                */
/* -------------------------------------------------------------------------- */
function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    console.log(inputEl.validity.valid);
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

/* -------------------------------------------------------------------------- */
/*                         Set Event Listener Function                        */
/* -------------------------------------------------------------------------- */
function setEventListeners(formEl, validationConfig) {
  const { inputSelector } = validationConfig;
  const { submitButtonSelector } = validationConfig;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, validationConfig);
      toggleButtonState(inputEls, submitButton, validationConfig);
    });
  });
}

/* -------------------------------------------------------------------------- */
/*                         Enable Validation                                  */
/* -------------------------------------------------------------------------- */
function enableValidation(validationConfig) {
  const { formSelector } = validationConfig;
  const formEls = [...document.querySelectorAll(formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, validationConfig);
  });
}

/* ------------------------------ Validate it! ------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  enableValidation(validationConfig);
});
