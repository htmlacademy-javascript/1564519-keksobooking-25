const formIsActive = true;

const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('fieldset');

const mapFilterForm = document.querySelector('.map__filters');
const mapFilters = mapFilterForm.querySelectorAll('.map__filter');

const housingFeatureFilter = mapFilterForm.querySelector('fieldset');

const switchFormStatus = (isActive) => {
  if (isActive) {
    adForm.classList.remove('ad-form--disabled');
    formFieldsets.forEach((fieldset) => {
      fieldset.disabled = !isActive;
    });
    mapFilterForm.classList.remove('map__filters--disabled');
    mapFilters.forEach((mapFilter) => {
      mapFilter.disabled = !isActive;
    });
    housingFeatureFilter.disabled = !isActive;
  } else {
    adForm.classList.add('ad-form--disabled');
    formFieldsets.forEach((fieldset) => {
      fieldset.disabled = !isActive;
    });
    mapFilterForm.classList.add('map__filters--disabled');
    mapFilters.forEach((mapFilter) => {
      mapFilter.disabled = !isActive;
    });
    housingFeatureFilter.disabled = !isActive;
  }
};

switchFormStatus(formIsActive);
