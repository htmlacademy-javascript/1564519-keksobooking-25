import { adPool } from './ad-generator.js';
const СardType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const popupList = [];

const createPopup = (cardInfo) => {
  const newCard = cardTemplate.cloneNode(true);
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = cardInfo.offer;

  newCard.querySelector('.popup__title').textContent = title;
  newCard.querySelector('.popup__text--address').textContent = `Координаты: ${address}`;
  newCard.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  newCard.querySelector('.popup__type').textContent = СardType[type];
  newCard.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  const featureList = newCard.querySelectorAll('.popup__feature');
  if (features.length !== 0) {
    featureList.forEach((el) => {
      const flatHasFeature = features.some((feature) => el.classList.contains(`popup__feature--${feature}`));
      if (!flatHasFeature) {
        el.remove();
      }
    });
  } else {
    newCard.querySelector('.popup__features').remove();
  }
  const popupDescription = newCard.querySelector('.popup__description');
  if (description.length !== 0) {
    popupDescription.textContent = description;
  } else {
    popupDescription.remove();
  }
  const photoList = newCard.querySelector('.popup__photos');
  if (photos.length !== 0) {
    const photoTemplate = photoList.querySelector('.popup__photo');
    photos.forEach((photo) => {
      const newPhoto = photoTemplate.cloneNode();
      newPhoto.src = photo;
      photoList.appendChild(newPhoto);
    });
    photoTemplate.remove();
  } else {
    photoList.remove();
  }
  newCard.querySelector('.popup__avatar').src = cardInfo.author.avatar;
  return newCard;
};

adPool.forEach((ad) => {
  const newPopup = createPopup(ad);
  popupList.push(newPopup);
});

const targetBlock = document.querySelector('#map-canvas');
targetBlock.appendChild(popupList[9]);
