import { renderAdPins } from './map.js';

fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((data) => renderAdPins(data));
