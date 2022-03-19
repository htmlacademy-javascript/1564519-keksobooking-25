import { switchFormStatus } from './form-state-handler.js';
import { adPool } from './ad-generator.js';
import { createPopup } from './html-ad-generator.js';
import { setUpValidator } from './form-validator.js';

const map = L.map('map-canvas')
  .on('load', () => {
    switchFormStatus(true);
    setUpValidator();
  })
  .setView({
    lat: 35.68271,
    lng: 139.75352,
  }, 12);

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
  {
    lat: 35.68271,
    lng: 139.75352,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);
mainPin.addTo(map);

const address = document.querySelector('#address');
address.disabled = true;
address.value = `${mainPin.getLatLng()['lat']}, ${mainPin.getLatLng()['lng']}`;
mainPin.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

const adPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

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
