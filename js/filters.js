const MIN_INTENSITY = 0;
const MAX_INTENSITY = 100;
const START_INTENSITY = 50;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
const filterIntensitySlider = imgUploadForm.querySelector('.effect-level__slider');
const filterIntensityValue = imgUploadForm.querySelector('.effect-level__value');

const FILTERS = {
  'chrome': { filter: 'grayscale( )', options: { min: 0, max: 1, start: 1, step: 0.1 } },
  'sepia': { filter: 'sepia( )', options: { min: 0, max: 1, start: 1, step: 0.1 } },
  'marvin': { filter: 'invert( %)', options: { min: 0, max: 100, start: 100, step: 1 } },
  'phobos': { filter: 'blur( px)', options: { min: 0, max: 3, start: 3, step: 0.1 } },
  'heat': { filter: 'brightness( )', options: { min: 1, max: 3, start: 3, step: 0.1 } },
};

noUiSlider.create(filterIntensitySlider, { range: { min: MIN_INTENSITY, max: MAX_INTENSITY }, start: START_INTENSITY });

let previousFilter = 'effects__preview--none';

const removeFilter = () => {
  imgUploadPreview.classList.remove(previousFilter);
  imgUploadPreview.classList.add('effects__preview--none');
  imgUploadPreview.style.filter = 'none';
  filterIntensitySlider.classList.toggle('hidden');
  previousFilter = 'effects__preview--none';
};

const changeFilter = (evt) => {
  if (evt.target.id.slice(0, 7) === 'effect-') {
    const newEffectName = evt.target.id.slice(7);
    const currentEffect = `effects__preview--${newEffectName}`;

    imgUploadPreview.classList.remove(previousFilter);
    imgUploadPreview.classList.add(currentEffect);
    previousFilter = currentEffect;

    if (newEffectName === 'none') {
      imgUploadPreview.style.filter = 'none';
      filterIntensitySlider.classList.toggle('hidden');
    }
    else {
      if (filterIntensitySlider.classList.contains('hidden')) {
        filterIntensitySlider.classList.remove('hidden');
      }

      const options = FILTERS[newEffectName].options;
      filterIntensitySlider.noUiSlider.updateOptions({
        range: { min: options.min, max: options.max},
        start: options.start,
        step: options.step
      });

      filterIntensitySlider.noUiSlider.on('update', () => {
        filterIntensityValue.value = filterIntensitySlider.noUiSlider.get();
        imgUploadPreview.style.filter = FILTERS[newEffectName].filter.replace(' ', filterIntensityValue.value);
      });
    }
  }
};

export{changeFilter as changeEffect, removeFilter};
