import { addBigPicture, bigPictureElement, resetComments } from './big-picture.js';
import { isEscape, getRandomElements, debounce } from './util.js';

const TIMEOUT_DELAY = 500;
const NUMBER_OF_RANDOM_POSTS = 10;

const CONTENT_FILTERS = {
  'DEFAULT': 'filter-default',
  'RANDOM' : 'filter-random',
  'DISCUSSED' : 'filter-discussed'
};

const pictureTemplateElement = document.querySelector('#picture').content;
const pictureElement  = pictureTemplateElement.querySelector('.picture');
const picturesElement  = document.querySelector('.pictures');
const imageFiltersFormElement = document.querySelector('.img-filters__form');
const defaultFilterElement = document.querySelector('#filter-default');
const randomFilterElement = document.querySelector('#filter-random');
const discussedFilterElement = document.querySelector('#filter-discussed');

let newPosts = [];
let tmpPosts = [];

const removeComments = () => {
  for (let i = 0; document.querySelectorAll('.social__comment').length; i++) {
    document.querySelector('.social__comment').remove();
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

const createPosts = () => {
  tmpPosts.forEach((post) => picturesElement.removeChild(post));
  tmpPosts = [];
  newPosts.forEach((post) => {
    const pictureClone = pictureElement.cloneNode(true);
    pictureClone.querySelector('.picture__img').src = post.url;
    pictureClone.querySelector('.picture__likes').textContent = post.likes;
    pictureClone.querySelector('.picture__comments').textContent = post.comments.length;
    picturesElement.appendChild(pictureClone);
    tmpPosts.push(pictureClone);
    pictureClone.addEventListener('click', () => {
      removeComments();
      addBigPicture(post);
    });
  });

  bigPictureElement.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closeBigPicture();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscape(evt)) {
      closeBigPicture();
    }
  });
};

const changeFilter = (posts, deb) => {
  imageFiltersFormElement.addEventListener('click', (evt) => {
    newPosts = [...posts];
    switch (evt.target.id) {
      case CONTENT_FILTERS['DEFAULT']:
        defaultFilterElement.classList.add('img-filters__button--active');
        randomFilterElement.classList.remove('img-filters__button--active');
        discussedFilterElement.classList.remove('img-filters__button--active');
        break;
      case CONTENT_FILTERS['RANDOM']:
        defaultFilterElement.classList.remove('img-filters__button--active');
        randomFilterElement.classList.add('img-filters__button--active');
        discussedFilterElement.classList.remove('img-filters__button--active');
        newPosts = getRandomElements(newPosts, NUMBER_OF_RANDOM_POSTS);
        break;
      case CONTENT_FILTERS['DISCUSSED']:
        defaultFilterElement.classList.remove('img-filters__button--active');
        randomFilterElement.classList.remove('img-filters__button--active');
        discussedFilterElement.classList.add('img-filters__button--active');
        newPosts.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }
    deb();
  });
};

const renderPosts = (posts) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  newPosts = [...posts];
  createPosts();
  changeFilter(posts, debounce(() => createPosts(), TIMEOUT_DELAY));
};

export { renderPosts, generateErrorMessage };
