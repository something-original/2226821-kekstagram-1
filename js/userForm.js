import { isEscapeKey } from "./util";
import { hashtag } from "./hashtag";

const uploadForm = document.querySelector('#upload-file');
const pictureWindow = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const description = document.querySelector('.text__description');

const onDocumentEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    pictureWindow.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadForm.value = '';
    hashtag.value = '';
    description.value = '';
    document.removeEventListener('keydown', onDocumentEscapeKeyDown);
  }
};

uploadForm.addEventListener('change', () => {
  pictureWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeyDown);
});

const closePictureWindow = () => {
  pictureWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscapeKeyDown);
  uploadForm.value = '';
  hashtag.value = '';
  description.value = '';
};

closeButton.addEventListener('click', closePictureWindow);
