import { renderAdPins } from './map.js';
import { showPinLoadErrorMessage } from './util.js';

fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((data) => renderAdPins(data))
  .catch(() => showPinLoadErrorMessage('При загрузке существующих объявлений произошла ошибка. Перезагрузите страницу или попробуйте позднее.'));
