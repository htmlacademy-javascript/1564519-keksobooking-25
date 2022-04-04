import { switchFeatureFilter, adOffer, isAdSimilar, debounce, removePins } from './util.js';
import { renderAdPins } from './map.js';
import { SIMILAR_ADS_COUNT } from './similar-ad-pins-renderer.js';

const RERENDER_DELAY = 500;
const FILTER_INPUT_SPECIAL_TYPE = 'checkbox';

const turnSimilarAdPinFilterOn = (data) => {
  const adForm = document.querySelector('.ad-form');
  const mapFiltersContainer = document.querySelectorAll('.map__filter, .map__checkbox');
  const filterChange = debounce((filterInput) => {
    if (filterInput.type === FILTER_INPUT_SPECIAL_TYPE) {
      switchFeatureFilter(adOffer.features, filterInput.value);
    } else {
      adOffer[`${filterInput.id.split('-')[1]}`] = filterInput.value;
    }
    const dataForPins = data.filter((ad) => isAdSimilar(adOffer, ad.offer)).slice(0, SIMILAR_ADS_COUNT);
    const pins = document.querySelectorAll('.leaflet-marker-icon');
    const popup = document.querySelector('.leaflet-popup-content-wrapper');
    if (popup) {
      popup.remove();
    }
    removePins(pins);
    renderAdPins(dataForPins);
  }, RERENDER_DELAY);

  mapFiltersContainer.forEach((filterInput) => {
    filterInput.addEventListener('change', () => filterChange(filterInput));
  });

  adForm.addEventListener('reset', () => {
    const pins = document.querySelectorAll('.leaflet-marker-icon');
    mapFiltersContainer.forEach((el) => {
      if (el.type === 'select-one') {
        el.value = 'any';
      } else {
        el.checked = false;
      }
    });
    removePins(pins);
    renderAdPins(data.slice(0, SIMILAR_ADS_COUNT));
  });
};

export { turnSimilarAdPinFilterOn };
