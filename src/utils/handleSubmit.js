import Popup from "../components/Popup.js";

export function handleSubmit(
  submitAction,
  popupInstance,
  submitText = "Save",
  loadingText = "Saving..."
) {
  if (!(popupInstance instanceof Popup)) {
    console.error("popupInstance must be an instance of Popup");
    return Promise.reject("Invalid popup instance");
  }

  const submitButton = popupInstance.submitButton;
  const popup = popupInstance._popupElement;

  if (!submitButton) {
    console.error("Submit button not found in popup");
    return Promise.reject("Submit button not found");
  }

  return Promise.resolve(submitAction())
    .then(() => {
      popupInstance.close();
    })
    .catch((err) => {
      console.error("Error: ${err}");
      throw err;
    })
    .finally(() => {
      popupInstance.renderLoading(false, submitText);
    });
}
