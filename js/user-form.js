import { isEscape } from './util.js';
import { scaleControlValueElement, resetScale } from './scale.js';
import { changeEffect, removeFilter } from './filters.js';
import { send } from './api.js';
import { isValid } from './validation.js';

const imageUploadStartElement = document.querySelector('.img-upload__start');
const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadFileElement = document.querySelector('#upload-file');
const textDescriptionElement = document.querySelector('.text__description');
const textHashtagsElement = document.querySelector('.text__hashtags');
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadPreviewElement = imageUploadOverlayElement .querySelector('.img-upload__preview');
const effectLevelSliderElement = imageUploadFormElement .querySelector('.effect-level__slider');
const imageUploadSubmitElement = imageUploadFormElement .querySelector('.img-upload__submit');

const deleteForm = () => {
  imageUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileElement.value = '';
  textDescriptionElement.value = '';
  textHashtagsElement.value = '';
  imageUploadFormElement.removeEventListener('change', changeEffect);
  removeFilter();
  resetScale();
  scaleControlValueElement.value ='100%';
  imageUploadPreviewElement.style = `transform: scale(${scaleControlValueElement.value})`;
};

const closeForm = (evt) => {
  if (isEscape(evt)) {
    deleteForm();
    document.removeEventListener('keydown', closeForm);
  }
};

const closeMessage = (message) => {
  document.body.removeChild(message);
};

const closeMessageByEscape = (evt, message) => {
  if (isEscape(evt)) {
    closeMessage(message);
    document.addEventListener('keydown', closeForm);
  }
};

const closeMessageByOutside = (evt, message) => {
  if (evt.target.className === 'error' || evt.target.className === 'success') {
    closeMessage(message);
  }
};

const generateMessage = (flag) => {
  const successSection = document.querySelector('#success').content.querySelector('section');
  const errorSection = document.querySelector('#error').content.querySelector('section');
  const messageID = flag ? successSection : errorSection;
  const message = messageID.cloneNode(true);
  const button = message.querySelector('button');
  document.body.appendChild(message);
  button.onclick = () => closeMessage(message);
  message.onclick = (evt) => {
    closeMessageByOutside(evt, message);
  };
  document.addEventListener('keydown', (evt) => {
    closeMessageByEscape(evt, message);
  }, { once: true } );

};

const success = () => {
  deleteForm();
  generateMessage(true);
};

const fail = () => {
  document.removeEventListener('keydown', closeForm);
  imageUploadSubmitElement.disabled = false;
  generateMessage(false);
};

const verifyForm = (evt) => {
  evt.preventDefault();
  if (isValid()) {
    imageUploadSubmitElement.disable = true;
    send(success, fail, new FormData(evt.target));
  }
};

const controlingListener = () => {
  document.addEventListener('keydown', closeForm);
  imageUploadOverlayElement.querySelector('.img-upload__cancel').addEventListener('click', () => {
    deleteForm();
    document.removeEventListener('keydown', closeForm);
  }, { once: true } );
  
};

const addForm = () => {
  imageUploadStartElement.addEventListener('change', () => {
    imageUploadOverlayElement.classList.remove('hidden');
    effectLevelSliderElement.classList.add('hidden');
    document.body.classList.add('modal-open');
    imageUploadFormElement.addEventListener('change', changeEffect);
    imageUploadFormElement.addEventListener('submit', verifyForm);
    controlingListener();
  });
};

export { addForm };
