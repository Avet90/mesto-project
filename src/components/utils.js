

export function disableButton(submitButton) {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add('button_inactive');
  };