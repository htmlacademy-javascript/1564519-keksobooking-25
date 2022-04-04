const MESSAGE_CLOSE_KEY = 'Escape';
const SUCCESS_TYPE = 'success';
const ERROR_TYPE = 'error';
const AD_OFFER_DEFAULT_VALUE = 'any';

const PriceByTypes = {
  LOW_PRICE: 10000,
  MEDIUM_PRICE: 50000,
  HIGH_PRICE: 100000
};
const PriceTypes = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high'
};


const typeOfPrice = (price) => {
  if (price < PriceByTypes.LOW_PRICE) {
    return PriceTypes.LOW;
  } else if (price < PriceByTypes.MEDIUM_PRICE) {
    return PriceTypes.MIDDLE;
  } else if (price < PriceByTypes.HIGH_PRICE) {
    return PriceTypes.HIGH;
  }
};

const doFeaturesMatch = (filterAdFeatures, similarAdFeatures) => {
  let matchingFeaturesCount = 0;
  filterAdFeatures.forEach((feature) => {
    if (similarAdFeatures && similarAdFeatures.some((similarFeature) => similarFeature === feature)) {
      matchingFeaturesCount++;
    }
  });
  return matchingFeaturesCount === filterAdFeatures.length;
};

const adOffer = {
  type: AD_OFFER_DEFAULT_VALUE,
  price: AD_OFFER_DEFAULT_VALUE,
  rooms: AD_OFFER_DEFAULT_VALUE,
  guests: AD_OFFER_DEFAULT_VALUE,
  features: [],
};

const isAdSimilar = (filterAd, similarAd) =>  (filterAd.type === similarAd.type || filterAd.type === AD_OFFER_DEFAULT_VALUE) &&
                                              (filterAd.price === typeOfPrice(similarAd.price) || filterAd.price === AD_OFFER_DEFAULT_VALUE) &&
                                              (filterAd.rooms === String(similarAd.rooms) || filterAd.rooms === AD_OFFER_DEFAULT_VALUE) &&
                                              (filterAd.guests === String(similarAd.guests) || filterAd.guests === AD_OFFER_DEFAULT_VALUE) &&
                                              (doFeaturesMatch(filterAd.features, similarAd.features) || filterAd.features.length === 0);

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

const removePins = (pins) => {
  pins.forEach((el, i) => {
    if (i !== 0) {
      el.remove();
    }
  });
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

export { removePins, debounce, showPinLoadErrorMessage, createMessage, ERROR_TYPE, SUCCESS_TYPE, switchFeatureFilter, adOffer, isAdSimilar};
