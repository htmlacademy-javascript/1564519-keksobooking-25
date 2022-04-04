import { resetMainPin } from './map.js';
import { MinPricePerNight } from './form-validator.js';

const DEFAULT_FORM_AVATAR_SRC = 'img/muffin-grey.svg';

const resetButton = document.querySelector('.ad-form__reset');
const form = document.querySelector('.ad-form');
const adPrice = document.querySelector('#price');
const slider = document.querySelector('.ad-form__slider');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoPreview = document.querySelector('.ad-form__photo img');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  resetMainPin();
  const popup = document.querySelector('.leaflet-popup-content-wrapper');
  if (popup) {
    popup.remove();
  }
  slider.noUiSlider.updateOptions({
    start: MinPricePerNight.FLAT,
  });
  adPrice.value = MinPricePerNight.FLAT;
  avatarPreview.src = DEFAULT_FORM_AVATAR_SRC;
  photoPreview.src = '';
});
