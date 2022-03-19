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
const TITLEMINLENGTH = 30;
const TITLEMAXLENGTH = 100;
const MAXPRICE = 100000;

const setUpValidator = () => {
  const form = document.querySelector('.ad-form');
  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error-text'
  }, true);

  const titleInput = document.querySelector('#title');
  const validateTitleLanguage = (value) => value.match(/^[A-Za-zА-Яа-яЁё0-9]*$/);
  const validateTitleLength = (value) => (value.length >= TITLEMINLENGTH && value.length <= TITLEMAXLENGTH) || value.length === 0;
  const validateTitle = (value) => value.length;
  pristine.addValidator(titleInput, validateTitleLanguage, 'Заголовок объявления должен состоять из букв русского или латинского алфавита и цифр.');
  pristine.addValidator(titleInput, validateTitleLength, `Длина заголовка должна быть больше ${TITLEMINLENGTH} и меньше ${TITLEMAXLENGTH} символов.`);
  pristine.addValidator(titleInput, validateTitle, 'Обязательное поле.');

  const adType = document.querySelector('#type');
  const priceInput = document.querySelector('#price');
  const validateMinPriceInput = (value) => Number(value) >= MinPricePerNight[adType.value.toUpperCase()] || Number(value) === 0;
  const validateMaxPriceInput = (value) => Number(value) <= MAXPRICE;
  const validatePriceInput = (value) => value.length;
  const getMinPriceErrorMessage = () => `Ночь в ${ErrorHouseNames[adType.value.toUpperCase()]} не может стоить меньше ${MinPricePerNight[adType.value.toUpperCase()]}`;
  const getMaxPriceErrorMessage = () => `Цена за ночь не должна превышать ${MAXPRICE}`;
  pristine.addValidator(priceInput, validateMinPriceInput, getMinPriceErrorMessage);
  pristine.addValidator(priceInput, validateMaxPriceInput, getMaxPriceErrorMessage);
  pristine.addValidator(priceInput, validatePriceInput, 'Обязательное поле.');
  adType.addEventListener('change', () => {
    priceInput.placeholder = `${MinPricePerNight[adType.value.toUpperCase()]}`;
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
    pristine.validate();
  });
};

export {setUpValidator};
