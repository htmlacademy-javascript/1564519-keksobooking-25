const formIsActive = false;

const switchFormStatus = (isActive) => {
  const adForm = document.querySelector('.ad-form');
  const formFieldsets = adForm.querySelectorAll('fieldset');
  const mapFilterForm = document.querySelector('.map__filters');
  const mapFilters = mapFilterForm.querySelectorAll('.map__filter');
  const housingFeatureFilter = mapFilterForm.querySelector('fieldset');
  if (isActive) {
    adForm.classList.remove('ad-form--disabled');
    formFieldsets.forEach((fieldset) => {
      fieldset.disabled = false;
    });
    mapFilterForm.classList.remove('map__filters--disabled');
    mapFilters.forEach((mapFilter) => {
      mapFilter.disabled = false;
    });
    housingFeatureFilter.disabled = false;
  } else {
    adForm.classList.add('ad-form--disabled');
    formFieldsets.forEach((fieldset) => {
      fieldset.disabled = true;
    });
    mapFilterForm.classList.add('map__filters--disabled');
    mapFilters.forEach((mapFilter) => {
      mapFilter.disabled = true;
    });
    housingFeatureFilter.disabled = true;
  }
};

switchFormStatus(formIsActive);
