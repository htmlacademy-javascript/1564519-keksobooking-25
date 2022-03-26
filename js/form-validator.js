import { createSuccessMessage, createErrorMessage } from './util.js';

const MinPricePerNight = {
  FLAT: 1000,
  BUNGALOW: 0,
  HOUSE: 5000,
  PALACE: 10000,
  HOTEL: 3000
};
const ErrorHouseNames = {
  FLAT: 'квартире',
  BUNGALOW: 'бунгало',
  HOUSE: 'доме',
  PALACE: 'дворце',
  HOTEL: 'отеле'
};
const GuestOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const MAX_PRICE = 100000;

const setUpValidator = () => {
  const form = document.querySelector('.ad-form');
  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error-text'
  }, true);

  const titleInput = document.querySelector('#title');
  const validateTitleLanguage = (value) => value.match(/^[A-Za-zА-Яа-яЁё0-9]*$/);
  const validateTitleLength = (value) => (value.length >= TITLE_MIN_LENGTH && value.length <= TITLE_MAX_LENGTH) || value.length === 0;
  const validateTitle = (value) => value.length;
  pristine.addValidator(titleInput, validateTitleLanguage, 'Заголовок объявления должен состоять из букв русского или латинского алфавита и цифр.');
  pristine.addValidator(titleInput, validateTitleLength, `Длина заголовка должна быть больше ${TITLE_MIN_LENGTH} и меньше ${TITLE_MAX_LENGTH} символов.`);
  pristine.addValidator(titleInput, validateTitle, 'Обязательное поле.');

  const adType = document.querySelector('#type');
  const priceInput = document.querySelector('#price');
  const validateMinPriceInput = (value) => Number(value) >= MinPricePerNight[adType.value.toUpperCase()] || Number(value) === 0;
  const validateMaxPriceInput = (value) => Number(value) <= MAX_PRICE;
  const validatePriceInput = (value) => value.length;
  const getMinPriceErrorMessage = () => `Ночь в ${ErrorHouseNames[adType.value.toUpperCase()]} не может стоить меньше ${MinPricePerNight[adType.value.toUpperCase()]}`;
  const getMaxPriceErrorMessage = () => `Цена за ночь не должна превышать ${MAX_PRICE}`;
  pristine.addValidator(priceInput, validateMinPriceInput, getMinPriceErrorMessage);
  pristine.addValidator(priceInput, validateMaxPriceInput, getMaxPriceErrorMessage);
  pristine.addValidator(priceInput, validatePriceInput, 'Обязательное поле.');

  const slider = document.querySelector('.ad-form__slider');
  noUiSlider.create(slider, {
    range: {
      'min': MinPricePerNight[adType.value.toUpperCase()],
      'max': MAX_PRICE,
    },
    start: MinPricePerNight[adType.value.toUpperCase()],
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value),
    },
  });
  slider.noUiSlider.on('update', () => {
    const currentPrice = slider.noUiSlider.get();
    priceInput.value = currentPrice;
  });
  priceInput.addEventListener('focusout', () => {
    slider.noUiSlider.set(priceInput.value);
  });
  adType.addEventListener('change', () => {
    priceInput.placeholder = `${MinPricePerNight[adType.value.toUpperCase()]}`;
    slider.noUiSlider.updateOptions({
      range: {
        min: MinPricePerNight[adType.value.toUpperCase()],
        max: MAX_PRICE,
      }
    });
    pristine.validate(priceInput);
  });

  const timeInField = document.querySelector('#timein');
  const timeOutField = document.querySelector('#timeout');
  timeInField.addEventListener('change', () => {
    timeOutField.value = timeInField.value;
  });
  timeOutField.addEventListener('change', () => {
    timeInField.value = timeOutField.value;
  });

  const roomInput = document.querySelector('#room_number');
  const guestInput = document.querySelector('#capacity');
  const validateGuestInput = () => GuestOptions[roomInput.value].includes(Number(guestInput.value));
  const getGuestErrorMessage = () => {
    const selectedRooms = roomInput.querySelector('option:checked');
    const selectedGuests = guestInput.querySelector('option:checked');
    if (roomInput.value === '100' && guestInput.value !== '0') {
      return `${selectedRooms.textContent} ${guestInput.querySelector('option[value="0"]').textContent}`;
    }
    return `${selectedRooms.textContent} ${roomInput.value === '1' ? 'не подходит' : 'не подходят'} ${selectedGuests.textContent}`;
  };
  pristine.addValidator(guestInput, validateGuestInput, getGuestErrorMessage);
  pristine.addValidator(roomInput, validateGuestInput);
  roomInput.addEventListener('change', () => {
    pristine.validate(guestInput);
  });
  guestInput.addEventListener('change', () => {
    pristine.validate(roomInput);
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      fetch('https://25.javascript.pages.academy/keksobooking',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then(() => evt.target.reset())
        .then(() => createSuccessMessage())
        .catch(() => createErrorMessage());
    }
  });
};

export {setUpValidator};
