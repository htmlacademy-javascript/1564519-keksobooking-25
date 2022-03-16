const form = document.querySelector('.ad-form');
const MinPricePerNight = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};
const GuestOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const pristine = new Pristine(form, {
  classTo: 'notice',
  errorTextParent: 'notice',
  errorTextClass: 'ad-form__error-text'
}, true);

const titleInput = document.querySelector('#title');
function validateTitleInput (value) {
  return value.length && value.match(/^[A-Za-zА-Яа-яЁё0-9]{30,100}$/);
}
pristine.addValidator(titleInput, validateTitleInput, 'Заголовок объявления должен состоять из букв русского или латинского алфавита и цифр. Длина заголовка должна быть больше 30 и меньше 100 символов.');

const adType = document.querySelector('#type');
const priceInput = document.querySelector('#price');
function validatePriceInput (value) {
  return value.length && Number(value) > MinPricePerNight[adType.value] && Number(value) < 100000;
}
function getPriceErrorMessage () {
  return `Цена за ночь должна быть больше ${MinPricePerNight[adType.value]} и меньше 100000`;
}
pristine.addValidator(priceInput, validatePriceInput, getPriceErrorMessage);
adType.addEventListener('change', () => {
  priceInput.placeholder = `${MinPricePerNight[adType.value] + 4000}`;
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
function validateGuestInput (value) {
  return GuestOptions[roomInput.value].includes(Number(guestInput.value));
}
function getGuestErrorMessage () {
  const selectedRooms = roomInput.querySelector('option:checked');
  const selectedGuests = guestInput.querySelector('option:checked')
  return `${selectedRooms.textContent} не подходит ${selectedGuests.textContent}`;
}
pristine.addValidator(guestInput, validateGuestInput, getGuestErrorMessage);
pristine.addValidator(roomInput, validateGuestInput, getGuestErrorMessage);


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  console.log(pristine.validate());
});
