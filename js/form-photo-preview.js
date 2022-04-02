const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field [type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload [type=file');
const photoPreview = document.querySelector('.ad-form__photo img');

const setPhotoPreview = (source, target) => {
  source.addEventListener('change', () => {
    const file = source.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
    if (matches) {
      target.src = URL.createObjectURL(file);
    }
  });
};

setPhotoPreview(avatarChooser, avatarPreview);
setPhotoPreview(photoChooser, photoPreview);
