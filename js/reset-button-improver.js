import { resetMainPin } from './map.js';
import { MinPricePerNight } from './form-validator.js';

const resetButton = document.querySelector('.ad-form__reset');
const form = document.querySelector('.ad-form');
const adPrice = document.querySelector('#price');
const slider = document.querySelector('.ad-form__slider');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  resetMainPin();
  adPrice.value = MinPricePerNight['FLAT'];
  slider.noUiSlider.updateOptions({
    start: MinPricePerNight['FLAT'],
  });
});
