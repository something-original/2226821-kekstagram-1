import { isEscapeKey } from "./util.js";
import { scaleControlValue } from "./scale.js";
import { changeEffect, removeFilter } from "./filters.js";
import { sendData } from "./api.js";
import { isValid } from "./validation.js";

const imageUploadStart  = document.querySelector('.img-upload__start');
const imageUploadOverlay  = document.querySelector('.img-upload__overlay');

const uploadFile = document.querySelector('#upload-file');

const textDescription  = document.querySelector('.text__description');
const textHashtags  = document.querySelector('.text__hashtags');
const imageUploadForm  = document.querySelector('.img-upload__form');

const imageUploadPreview  = imageUploadOverlay.querySelector('.img-upload__preview');

const effectLevelSlider = imageUploadForm.querySelector('.effect-level__slider');
const imageUploadSubmit = imageUploadForm.querySelector('.img-upload__submit');

const addForm = () => {
  imageUploadStart.addEventListener('change', () => {
    imageUploadOverlay.classList.remove('hidden');
    effectLevelSlider.classList.add('hidden');
    document.body.classList.add('modal-open');
    imageUploadForm.addEventListener('change', changeEffect);
    imageUploadForm.addEventListener('submit', verifyForm);
    listenerControl();
  });
};

const deleteForm = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  textDescription.value = '';
  textHashtags.value = '';
  imageUploadForm.removeEventListener('change', changeEffect);
  removeFilter();
};

const formClosing = (evt) => {
  if (isEscapeKey(evt)) {
    deleteForm();
    document.removeEventListener('keydown', formClosing);
  }
};

const closeMessageByEscape = (evt, message) => {
  if (isEscapeKey(evt)) {
    document.body.removeChild(message);
    document.addEventListener('keydown', formClosing);
  }
};

const closeMessageByOutside = (evt, message) => {
  if (evt.target.className === 'error' || evt.target.className === 'success') {
    document.body.removeChild(message);
  }
};

const generateMessage = (flag) => {
  let messageID;
  if (flag) {
    messageID = document.querySelector('#success').content.querySelector('section');
  }
  else {
    messageID = document.querySelector('#error').content.querySelector('section');
  }
  const message = messageID.cloneNode(true);
  const button = message.querySelector('button');
  document.body.appendChild(message);
  button.onclick = () => document.body.removeChild(message);
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
  document.removeEventListener('keydown', formClosing);
  imageUploadSubmit.disabled = false;
  generateMessage(false);
};

const verifyForm = (evt) => {
  evt.preventDefault();
  if (isValid()) {
    imageUploadSubmit.disable = true;
    sendData(success, fail, new FormData(evt.target));
  }
};

const listenerControl = () => {
  document.addEventListener('keydown', formClosing);
  imageUploadOverlay.querySelector('.img-upload__cancel').addEventListener('click', () => {
    deleteForm();
    document.removeEventListener('keydown', formClosing);
  }, { once: true } );
  scaleControlValue.value ='100%';
  imageUploadPreview.style = `transform: scale(${scaleControlValue})`;
};

export { addForm };
