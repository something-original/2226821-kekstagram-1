const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_STEP = 25;

const imageUploadPreviewElement = document.querySelector('.img-upload__preview');
const imageUploadScaleElement = document.querySelector('.img-upload__scale');
const scaleControlSmallerElement = imageUploadScaleElement.querySelector('.scale__control--smaller');
const scaleControlValueElement = imageUploadScaleElement.querySelector('.scale__control--value');
const scaleControlBiggerElement = imageUploadScaleElement.querySelector('.scale__control--bigger');

let scale = parseInt(scaleControlValueElement.value.replace('%', ''), 10);

const transformScale = (sc) => {
  scaleControlValueElement.value = `${sc}%`;
  imageUploadPreviewElement.style = `transform: scale(${sc / 100})`;
};

const scaleUp = () => {
  scale = (scale + SCALE_STEP > MAX_SCALE_VALUE) ? MAX_SCALE_VALUE : scale + SCALE_STEP;
  transformScale(scale);
};

const scaleDown = () => {
  scale = (scale - SCALE_STEP < MIN_SCALE_VALUE) ? MIN_SCALE_VALUE : scale - SCALE_STEP;
  transformScale(scale);
};

const resetScale = () => {
  scale = 100;
}

scaleControlSmallerElement.addEventListener('click', scaleDown);
scaleControlBiggerElement.addEventListener('click', scaleUp);

export { scaleControlValueElement, resetScale };
