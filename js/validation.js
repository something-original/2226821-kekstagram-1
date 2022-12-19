import { isEscapeKey, MAX_COMMENT_LENGTH, COMMENTS_REGEX as regex, isUnderMaximum } from './util.js';

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');

const defaultConfig = {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__item--invalid',
    successClass: 'img-upload__item--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error'
};

const pristine = new Pristine(imgUploadForm, defaultConfig, false);

const hashtagChecker = (value) => {
  value = value.toLowerCase().trim();
  if (!value) {
    return true;
  }
  const hashtag = value.split(" ");
  for (let i = 0; i < hashtag.length; i++) {
    if (!regex.test(hashtag[i])) {
      return false;
    }
  }
  const hashtags = [...new Set(hashtag)];
  return (hashtag.length <= 5 && hashtag.length === hashtags.length);
};

const onHashTagsKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onDescriptionKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const validate = () => {
  textHashtags.addEventListener('keydown', onHashTagsKeyDown);
  textDescription.addEventListener('keydown', onDescriptionKeyDown);

  pristine.addValidator(textHashtags, hashtagChecker, 'Hashtag entered incorrectly');
  pristine.addValidator(textDescription, isUnderMaximum, `The comment length has exceeded the ${MAX_COMMENT_LENGTH} character limit`);
};

const isValid = () => pristine.validate();

export { validate, isValid };
