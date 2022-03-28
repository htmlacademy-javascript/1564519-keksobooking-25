const MESSAGE_CLOSE_KEY = 'Escape';
const SUCCESS_TYPE = 'success';
const ERROR_TYPE = 'error';

const showPinLoadErrorMessage = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '1000';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '25%';
  errorContainer.style.top = '35%';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '10px';
  errorContainer.style.width = '50%';
  errorContainer.style.fontSize = '24px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';
  errorContainer.textContent = message;
  document.querySelector('.map__canvas').append(errorContainer);
};

const createMessage = (type) => {
  const messageTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const newMessage = messageTemplate.cloneNode(true);
  document.querySelector('.notice').append(newMessage);
  newMessage.addEventListener('click', (evt) => evt.target.remove());
  document.addEventListener('keydown', (evt) => {
    if (evt.key === MESSAGE_CLOSE_KEY) {
      evt.preventDefault();
      newMessage.remove();
    }
  });
  if (type === ERROR_TYPE) {
    const tryAgainButton = newMessage.querySelector('.error__button');
    tryAgainButton.addEventListener('click', () => newMessage.remove());
  }
};

export {showPinLoadErrorMessage, createMessage, ERROR_TYPE, SUCCESS_TYPE};
