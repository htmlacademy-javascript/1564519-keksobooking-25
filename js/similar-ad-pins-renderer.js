import { renderAdPins } from './map.js';
import { showPinLoadErrorMessage } from './util.js';

const REQUEST_TARGET = 'https://25.javascript.pages.academy/keksobooking/data';

fetch(REQUEST_TARGET)
  .then((response) => response.json())
  .then((data) => renderAdPins(data))
  .catch(() => showPinLoadErrorMessage('При загрузке существующих объявлений произошла ошибка. Перезагрузите страницу или попробуйте позднее.'));
