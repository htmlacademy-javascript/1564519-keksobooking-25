const randInt = (bound1, bound2) => {
  const result = Math.floor(
    Math.random() * (Math.abs(bound1 - bound2) + 1) + Math.min(bound1, bound2)
  );
  return result;
};

const randFloat = (bound1, bound2, floatSigns) => {
  const result =
    Math.random() * Math.abs(bound1 - bound2) + Math.min(bound1, bound2);
  return +result.toFixed(floatSigns);
};

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

const createAuthor = () => ({
  avatar: `img/avatars/user${randInt(0, 10)}.png`,
});

const createOffer = () => ({
  title: "Квартира в новом доме со свежим ремонтом",
  //address: `${this.location.lat}, ${this.location.lng}`,
  price: randInt(0, 100000),
  type: ["palace", "flat", "house", "bungalow", "hotel"][randInt(0, 4)],
  rooms: randInt(1, 10),
  guests: randInt(1, 10),
  checkin: ["12:00", "13:00", "14:00"][randInt(0, 2)],
  checkout: ["12:00", "13:00", "14:00"][randInt(0, 2)],
  features: randLengthArray([
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner",
  ]),
  description:
    "Свежий ремонт, отличный вид из окна, магазин через дорогу, остановка в 5 минутах ходьбы",
  photos: randLengthArray([
    "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg",
    "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg",
    "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg",
  ]),
});

const createLocation = () => ({
  lat: randFloat(35.65, 35.7, 5),
  lng: randFloat(139.7, 139.8, 5),
});

const createInfo = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});

console.log(createInfo());
