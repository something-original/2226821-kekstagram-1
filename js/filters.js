const EFFECTS = {
  'chrome': { filter: 'grayscale( )', options: { min: 0, max: 1, start: 1, step: 0.1 } },
  'sepia': { filter: 'sepia( )', options: { min: 0, max: 1, start: 1, step: 0.1 } },
  'marvin': { filter: 'invert( %)', options: { min: 0, max: 100, start: 100, step: 1 } },
  'phobos': { filter: 'blur( px)', options: { min: 0, max: 3, start: 3, step: 0.1 } },
  'heat': { filter: 'brightness( )', options: { min: 1, max: 3, start: 3, step: 0.1 } },
};

const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadPreviewElement = imageUploadFormElement.querySelector('.img-upload__preview');
const effectLevelSliderElement = imageUploadFormElement.querySelector('.effect-level__slider');
const effectLevelValueElement = imageUploadFormElement.querySelector('.effect-level__value');

noUiSlider.create(effectLevelSliderElement, { range: { min: 0, max: 0 }, start: 0 });

let previousEffect = 'effects__preview--none';

const removeFilter = () => {
  imageUploadPreviewElement.classList.remove(previousEffect);
  imageUploadPreviewElement.classList.add('effects__preview--none');
  imageUploadPreviewElement.style.filter = 'none';
  effectLevelSliderElement.classList.toggle('hidden');
  previousEffect = 'effects__preview--none';
};

const changeEffect = (evt) => {
  if (evt.target.id.slice(0, 7) === 'effect-') {
    const newEffectName = evt.target.id.slice(7);
    const currentEffect = `effects__preview--${newEffectName}`;

    imageUploadPreviewElement.classList.remove(previousEffect);
    imageUploadPreviewElement.classList.add(currentEffect);
    previousEffect = currentEffect;

    if (newEffectName === 'none') {
      imageUploadPreviewElement.style.filter = 'none';
      effectLevelSliderElement.classList.toggle('hidden');
    }
    else {
      if (effectLevelSliderElement.classList.contains('hidden')) {
        effectLevelSliderElement.classList.remove('hidden');
      }

      const options = EFFECTS[newEffectName].options;
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: { min: options.min, max: options.max},
        start: options.start,
        step: options.step
      });

      effectLevelSliderElement.noUiSlider.on('update', () => {
        effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
        imageUploadPreviewElement.style.filter = EFFECTS[newEffectName].filter.replace(' ', effectLevelValueElement.value);
      });
    }
  }
};

export{changeEffect, removeFilter};
