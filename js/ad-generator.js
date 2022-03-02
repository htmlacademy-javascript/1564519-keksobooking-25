import {randInt, randFloat} from './random-value-generator.js';

const randLengthArray = (arr) => {
  const result = [];
  const desirableLength = randInt(0, arr.length);
  for (let i = 0; i < desirableLength; i++) {
    const randIndex = randInt(0, arr.length - 1);
    result.push(arr[randIndex]);
    arr.splice(randIndex, 1);
  }
  return result;
};

const createOffer = (location) => ({
  title: 'Квартира в новом доме со свежим ремонтом',
  address: `${location.lat}, ${location.lng}`,
  price: randInt(0, 100000),
  type: ['palace', 'flat', 'house', 'bungalow', 'hotel'][randInt(0, 4)],
  rooms: randInt(1, 10),
  guests: randInt(1, 10),
  checkin: ['12:00', '13:00', '14:00'][randInt(0, 2)],
  checkout: ['12:00', '13:00', '14:00'][randInt(0, 2)],
  features: randLengthArray([
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ]),
  description:
    'Свежий ремонт, отличный вид из окна, магазин через дорогу, остановка в 5 минутах ходьбы',
  photos: randLengthArray([
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ]),
});

const createLocation = () => ({
  lat: randFloat(35.65, 35.7, 5),
  lng: randFloat(139.7, 139.8, 5),
});

const createAd = () => {
  const location = createLocation();
  const result = {
    author: {},
    offer: createOffer(location),
    location: location,
  };
  result.offer.address = `${result.location.lat}, ${result.location.lng}`;
  return result;
};

const adPool = [];
for (let i = 1; i <= 10; i++) {
  const ad = createAd();
  let adNumber = '';
  if (i === 10) {
    adNumber += 10;
  } else {
    adNumber = `0${  i}`;
  }
  ad.author = {
    avatar: `img/avatars/user${adNumber}.png`,
  };
  adPool.push(ad);
}

export {adPool};
