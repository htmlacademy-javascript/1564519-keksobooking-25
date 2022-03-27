import { pristine } from './form-validator.js';
import { createMessage, ERROR_TYPE, SUCCESS_TYPE } from './util.js';
import { resetMainPin } from './map.js';

const FLAT_STANDARD_PRICE = 1000;
const REQUEST_TARGET = 'https://25.javascript.pages.academy/keksobooking';

const form = document.querySelector('.ad-form');
const adPrice = document.querySelector('#price');
const slider = document.querySelector('.ad-form__slider');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    fetch(REQUEST_TARGET,
      {
        method: 'POST',
        body: formData,
      }
    )
      .then(() => {
        evt.target.reset();
        resetMainPin();
        adPrice.value = FLAT_STANDARD_PRICE;
        slider.noUiSlider.updateOptions({
          start: FLAT_STANDARD_PRICE,
        });
      })
      .then(() => createMessage(SUCCESS_TYPE))
      .catch(() => createMessage(ERROR_TYPE));
  }
});
