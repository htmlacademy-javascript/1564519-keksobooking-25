import { switchFeatureFilter, adOffer, isAdSimilar, debounce } from './util.js';
import { renderAdPins } from './map.js';
import { SIMILAR_ADS_COUNT } from './similar-ad-pins-renderer.js';

const RERENDER_DELAY = 500;

const mapFiltersContainer = document.querySelectorAll('.map__filter, .map__checkbox');

const turnSimilarAdPinFilterOn = (data) => {
  const filterChange = debounce((filterInput) => {
    if (filterInput.type === 'checkbox') {
      switchFeatureFilter(adOffer['features'], filterInput.value);
    } else {
      adOffer[`${filterInput.id.split('-')[1]}`] = filterInput.value;
    }
    const dataForPins = data.filter((ad) => isAdSimilar(adOffer, ad['offer'])).slice(0, SIMILAR_ADS_COUNT);
    const pins = document.querySelectorAll('.leaflet-marker-icon');
    const popup = document.querySelector('.leaflet-popup-content-wrapper');
    if (popup) {
      popup.remove();
    }
    pins.forEach((el, i) => {
      if (i !== 0) {
        el.remove();
      }
    });
    renderAdPins(dataForPins);
  }, RERENDER_DELAY);
  mapFiltersContainer.forEach((filterInput) => {
    filterInput.addEventListener('change', () => filterChange(filterInput));
  });
};

export { turnSimilarAdPinFilterOn };
