import { renderAdPins } from './map.js';
import { showPinLoadErrorMessage } from './util.js';
import { turnSimilarAdPinFilterOn } from './ad-filter.js';
import { switchFilterStatus } from './form-state-handler.js';

const REQUEST_TARGET = 'https://25.javascript.pages.academy/keksobooking/data';
const SIMILAR_ADS_COUNT = 10;

fetch(REQUEST_TARGET)
  .then((response) => {
    switchFilterStatus(true);
    return response.json();
  })
  .then((data) => {
    renderAdPins(data.slice(0, SIMILAR_ADS_COUNT));
    turnSimilarAdPinFilterOn(data);
  })
  .catch(() => showPinLoadErrorMessage('При загрузке существующих объявлений произошла ошибка. Перезагрузите страницу или попробуйте позднее.'));

export { SIMILAR_ADS_COUNT };
