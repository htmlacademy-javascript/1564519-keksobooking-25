const ERROR_SHOW_TIME = 5000;

const showErrorMessage = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = 1000;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '25%';
  errorContainer.style.top = '45%';
  errorContainer.style.right = 0;
  errorContainer.style.padding = '10px';
  errorContainer.style.width = '50%';
  errorContainer.style.fontSize = '24px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';
  errorContainer.textContent = message;
  document.querySelector('.map__canvas').append(errorContainer);
  setTimeout(() => errorContainer.remove(), ERROR_SHOW_TIME);
};

const createSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const newSuccessMessage = successMessageTemplate.cloneNode(true);
  document.querySelector('.notice').append(newSuccessMessage);
  newSuccessMessage.addEventListener('click', (evt) => evt.target.remove());
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      newSuccessMessage.remove();
    }
  });
};

const createErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const newErrorMessage = errorMessageTemplate.cloneNode(true);
  newErrorMessage.addEventListener('click', (evt) => evt.target.remove());
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      newErrorMessage.remove();
    }
  });
  const tryAgainButton = newErrorMessage.querySelector('.error__button');
  tryAgainButton.addEventListener('click', () => newErrorMessage.remove());
  document.querySelector('.notice').append(newErrorMessage);
};


export {showErrorMessage, createSuccessMessage, createErrorMessage};
