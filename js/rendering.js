import { addBigPicture, bigPictureElement, resetComments } from './full-size-picture.js';
import { isEscape } from './util.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureElement  = pictureTemplate.querySelector('.picture');
const picturesElement  = document.querySelector('.pictures');
const cmts = document.querySelectorAll('.social__comment');

const removeComments = () => {
  for (let i = 0; cmts.length; i++) {
    let cmt = document.querySelector('.social__comment');
    cmt.remove();
  }
};

const closeBigPicture = () => {
  removeComments();
  bigPictureElement.classList.add('hidden');
  bigPictureElement.querySelector('.social__comment-count').classList.remove('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
  resetComments();
};

const generateErrorMessage = (message) => {
  const error = document.querySelector('#error').content.querySelector('section').cloneNode(true);
  error.querySelector('h2').textContent = message;
  document.querySelector('body').append(error);
};

const renderPosts = (posts) => {
  posts.forEach((post) => {
    const pictureClone = pictureElement.cloneNode(true);
    pictureClone.querySelector('.picture__img').src = post.url;
    pictureClone.querySelector('.picture__likes').textContent = post.likes;
    pictureClone.querySelector('.picture__comments').textContent = post.comments.length;
    picturesElement.appendChild(pictureClone);
    pictureClone.addEventListener('click', () => {
      removeComments();
      addBigPicture(post);
    });
  });

  bigPictureElement.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closeBigPicture();
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    if (isEscape(evt)) {
      closeBigPicture();
    }
  });
    pictureListElement.appendChild(pictureFragment);
};

export { renderPosts, generateErrorMessage };