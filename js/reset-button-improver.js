import { resetMainPin } from './map.js';

const FLAT_STANDARD_PRICE = 1000;

const resetButton = document.querySelector('.ad-form__reset');
const form = document.querySelector('.ad-form');
const adPrice = document.querySelector('#price');
const slider = document.querySelector('.ad-form__slider');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  resetMainPin();
  adPrice.value = FLAT_STANDARD_PRICE;
  slider.noUiSlider.updateOptions({
    start: FLAT_STANDARD_PRICE,
  });
});
