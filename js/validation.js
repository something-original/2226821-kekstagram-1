import { isEscape, checkCommLength, regex, MAX_NUMBER_OF_HASHTAGS, MAX_COMMENT_LENGTH } from './util.js';

const textHashTagsElement = document.querySelector('.text__hashtags');
const textDescriptionElement = document.querySelector('.text__description');
const imageUploadFormElement = document.querySelector('.img-upload__form');

const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
};

const pristine = new Pristine(imageUploadFormElement, defaultConfig, false);

const checkHashtagFormat = (hashtagSequence) => {
  hashtagSequence = hashtagSequence.toLowerCase().trim();
  if (!hashtagSequence) {
    return true;
  }
  const hashtagArray = hashtagSequence.split(' ');
  for (const hashtag of hashtagArray) {
    if (!regex.test(hashtag)) {
      return false;
    }
  }
  const hashtags = [...new Set(hashtagArray)];
  return hashtagArray.length <= MAX_NUMBER_OF_HASHTAGS && hashtagArray.length === hashtags.length;
};

const dontCloseOnEsc = (evt) => {
  if (isEscape(evt)) {
    evt.stopPropagation();
  }
};

const validateInfo = () => {
  textHashTagsElement.addEventListener('keydown', dontCloseOnEsc);
  textDescriptionElement.addEventListener('keydown', dontCloseOnEsc);
  pristine.addValidator(textHashTagsElement, checkHashtagFormat, 'Неверный формат хештега');
  pristine.addValidator(textDescriptionElement, checkCommLength, `Подпись не может содержать более ${MAX_COMMENT_LENGTH} символов`);
};

const isValid = () => pristine.validate();

export { validateInfo, isValid };
