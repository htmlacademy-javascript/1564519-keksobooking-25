import { switchFeatureFilter, adOffer, isAdSimilar } from './util.js';
import { renderAdPins } from './map.js';
import { SIMILAR_ADS_COUNT } from './similar-ad-pins-renderer.js';

const mapFiltersContainer = document.querySelectorAll('.map__filter, .map__checkbox');

const turnSimilarAdPinFilterOn = (data) => {
  mapFiltersContainer.forEach((filterInput) => {
    filterInput.addEventListener('change', () => {
      if (filterInput.type === 'checkbox') {
        switchFeatureFilter(adOffer['features'], filterInput.value);
      } else {
        adOffer[`${filterInput.id.split('-')[1]}`] = filterInput.value;
      }
      const dataForPins = data.filter((ad) => isAdSimilar(adOffer, ad['offer']));
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
      renderAdPins(dataForPins.slice(0, SIMILAR_ADS_COUNT));
    });
  });
};

export { turnSimilarAdPinFilterOn };
