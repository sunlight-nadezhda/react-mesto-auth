export const renderLoading = (popupSelector, isAvailable) => {
  const popupElement = document.querySelector(popupSelector);
  const formElement = popupElement.querySelector('.popup__form');
  const buttonSubmitElement = formElement.querySelector('.popup__save-button');
  const buttonValue = buttonSubmitElement.textContent;

  if (isAvailable) {
    buttonSubmitElement.textContent = buttonValue;
    buttonSubmitElement.removeAttribute('disabled');
  } else {
    buttonSubmitElement.textContent = 'Сохранение...';
    buttonSubmitElement.setAttribute('disabled', true);
  }
};

// export const renderLoading = (popupSelector, isAvailable) => {
//   this.popupElement = document.querySelector(popupSelector);
//   this.formElement = this.popupElement.querySelector('.popup__form');
//   this.buttonSubmitElement = this.formElement.querySelector('.popup__save-button');
//   this.buttonValue = this.buttonSubmitElement.textContent;

//   if (isAvailable) {
//     this.buttonSubmitElement.textContent = this.buttonValue;
//     this.buttonSubmitElement.removeAttribute('disabled');
//   } else {
//     this.buttonSubmitElement.textContent = 'Сохранение...';
//     this.buttonSubmitElement.setAttribute('disabled', true);
//   }
// };
