const form = document.querySelector('.ad-form');
const PricePerNight = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__label',
  errorTextParent: 'ad-form__label',
  errorTextClass: 'ad-form__label-error-text'
}, true);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  console.log(isValid);
});

const priceInput = document.querySelector('#price');
const adType = document.querySelector('#type');

adType.addEventListener('change', () => {
  priceInput.min = PricePerNight[adType.value];
});


console.log(pristine);
