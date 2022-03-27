import { pristine } from './form-validator.js';
import { createMessage } from './util.js';
import { resetMainPin } from './map.js';

const FLAT_STANDARD_PRICE = 1000;

const form = document.querySelector('.ad-form');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const adPrice = document.querySelector('#price');
  const slider = document.querySelector('.ad-form__slider');
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    fetch('https://25.javascript.pages.academy/keksobooking',
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
      .then(() => createMessage('success'))
      .catch(() => createMessage('error'));
  }
});
