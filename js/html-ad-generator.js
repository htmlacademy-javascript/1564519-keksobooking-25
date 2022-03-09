import { adPool } from './ad-generator.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const newCard = cardTemplate.cloneNode(true);
const card = adPool[0];

const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = card.offer;

newCard.querySelector('.popup__title').textContent = title;
newCard.querySelector('.popup__text--address').textContent = `Координаты: ${address}`;
newCard.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
const cardType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
newCard.querySelector('.popup__type').textContent = cardType[type];
newCard.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
newCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
const featureList = newCard.querySelectorAll('.popup__feature');
featureList.forEach((el) => {
  const flatHasFeature = features.some((feature) => el.classList.contains(`popup__feature--${feature}`));
  if (!flatHasFeature) {
    el.remove();
  }
});
newCard.querySelector('.popup__description').textContent = description;
const photoList = newCard.querySelector('.popup__photos');
photos.forEach(photo => {
  const newPhoto = photoList.querySelector('.popup__photo').cloneNode();
  newPhoto.src = photo;
  photoList.appendChild(newPhoto);
});
photoList.querySelector('.popup__photo').remove();
newCard.querySelector('.popup__avatar').src = card.author.avatar;

const targetBlock = document.querySelector('#map-canvas');
targetBlock.appendChild(newCard);
