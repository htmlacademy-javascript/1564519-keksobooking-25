const MESSAGE_CLOSE_KEY = 'Escape';
const SUCCESS_TYPE = 'success';
const ERROR_TYPE = 'error';

const LOW_PRICE = 10000;
const MEDIUM_PRICE = 50000;
const HIGH_PRICE = 100000;

const typeOfPrice = (price) => {
  if (price < LOW_PRICE) {
    return 'low';
  } else if (price < MEDIUM_PRICE) {
    return 'middle';
  } else if (price < HIGH_PRICE) {
    return 'high';
  }
};

const doFeaturesMatch = (filterAdFeatures, similarAdFeatures) => {
  let matchingFeaturesCount = 0;
  filterAdFeatures.forEach((feature) => {
    if (similarAdFeatures && similarAdFeatures.some((similarFeature) => similarFeature === feature)) {
      matchingFeaturesCount++;
    }
  });
  if (matchingFeaturesCount === filterAdFeatures.length) {
    return true;
  } else {
    return false;
  }
};

const adOffer = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};

const isAdSimilar = (filterAd, similarAd) => {
  if  ( (filterAd['type'] === similarAd['type'] || filterAd['type'] === 'any') &&
        (filterAd['price'] === typeOfPrice(similarAd['price']) || filterAd['price'] === 'any') &&
        (filterAd['rooms'] === String(similarAd['rooms']) || filterAd['rooms'] === 'any') &&
        (filterAd['guests'] === String(similarAd['guests']) || filterAd['guests'] === 'any') &&
        (doFeaturesMatch(filterAd['features'], similarAd['features']) || filterAd['features'].length === 0)) {
    return true;
  } else {
    return false;
  }
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const showPinLoadErrorMessage = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '1000';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '25%';
  errorContainer.style.top = '35%';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '10px';
  errorContainer.style.width = '50%';
  errorContainer.style.fontSize = '24px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';
  errorContainer.textContent = message;
  document.querySelector('.map__canvas').append(errorContainer);
};

const createMessage = (type) => {
  const messageTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const newMessage = messageTemplate.cloneNode(true);
  document.querySelector('.notice').append(newMessage);
  newMessage.addEventListener('click', (evt) => evt.target.remove());
  document.addEventListener('keydown', (evt) => {
    if (evt.key === MESSAGE_CLOSE_KEY) {
      evt.preventDefault();
      newMessage.remove();
    }
  });
  if (type === ERROR_TYPE) {
    const tryAgainButton = newMessage.querySelector('.error__button');
    tryAgainButton.addEventListener('click', () => newMessage.remove());
  }
};

const switchFeatureFilter = (array, feature) => {
  if (array.some((el) => el === feature)) {
    const featureIndex = array.indexOf(feature);
    array.splice(featureIndex, 1);
  } else {
    array.push(feature);
  }
};

export { debounce, showPinLoadErrorMessage, createMessage, ERROR_TYPE, SUCCESS_TYPE, switchFeatureFilter, adOffer, isAdSimilar};
