import { switchFormStatus } from './form-state-handler.js';
import { createPopup } from './html-ad-generator.js';
import { setUpValidator } from './form-validator.js';

const MAP_CENTER = {
  lat: 35.68271,
  lng: 139.75352,
};
const MAP_SCALE = 13;
const MAIN_PIN_SIDE_LENGTH = 52;
const AD_PIN_SIDE_LENGTH = 40;
const DECIMAL_POINT = 5;

const map = L.map('map-canvas')
  .on('load', () => {
    switchFormStatus(true);
    setUpValidator();
  })
  .setView(MAP_CENTER, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_PIN_SIDE_LENGTH, MAIN_PIN_SIDE_LENGTH],
  iconAnchor: [MAIN_PIN_SIDE_LENGTH / 2, MAIN_PIN_SIDE_LENGTH],
});

const mainPin = L.marker(
  MAP_CENTER,
  {
    draggable: true,
    icon: mainPinIcon,
  }
);
mainPin.addTo(map);

const address = document.querySelector('#address');
address.readOnly = true;
address.value = `${mainPin.getLatLng()['lat']}, ${mainPin.getLatLng()['lng']}`;
mainPin.on('move', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  address.value = `${lat.toFixed(DECIMAL_POINT)}, ${lng.toFixed(DECIMAL_POINT)}`;
});

const resetMainPin = () => {
  mainPin.setLatLng(MAP_CENTER);
  address.value = `${MAP_CENTER['lat']}, ${MAP_CENTER['lng']}`;
  map.setView(MAP_CENTER, MAP_SCALE);
};

const adPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [AD_PIN_SIDE_LENGTH, AD_PIN_SIDE_LENGTH],
  iconAnchor: [AD_PIN_SIDE_LENGTH / 2, AD_PIN_SIDE_LENGTH],
});

const createPin = (element) => {
  const adPin = L.marker(
    {
      lat: element['location']['lat'],
      lng: element['location']['lng'],
    },
    {
      icon: adPinIcon,
    }
  );
  adPin
    .addTo(map)
    .bindPopup(createPopup(element));
};

const renderAdPins = (adPool) => adPool.forEach(createPin);

export { createPin, renderAdPins, resetMainPin };
