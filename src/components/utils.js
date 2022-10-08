

export function disableButton() {
    const buttonMesto = document.querySelector(".mesto__add");
    buttonMesto.setAttribute("disabled", true);
    buttonMesto.classList.add('button_inactive');
  };