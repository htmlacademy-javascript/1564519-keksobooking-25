import { switchFormStatus } from './form-state-handler.js';
import { createPopup } from './html-ad-generator.js';
import { setUpValidator } from './form-validator.js';
const MAP_CENTER = {
  lat: 35.68271,
  lng: 139.75352,
};
const DECIMAL_POINT = 5;

switchFormStatus(false);
const map = L.map('map-canvas')
  .on('load', () => {
    switchFormStatus(true);
    setUpValidator();
  })
  .setView(MAP_CENTER, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
address.disabled = true;
address.value = `${mainPin.getLatLng()['lat']}, ${mainPin.getLatLng()['lng']}`;
mainPin.on('move', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  address.value = `${lat.toFixed(DECIMAL_POINT)}, ${lng.toFixed(DECIMAL_POINT)}`;
});

const adPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const renderAdPins = (adPool) => {
  adPool.forEach((el) => {
    const adPin = L.marker(
      {
        lat: el['location']['lat'],
        lng: el['location']['lng'],
      },
      {
        icon: adPinIcon,
      }
    );
    adPin
      .addTo(map)
      .bindPopup(createPopup(el));
  });
};

export { renderAdPins };
