import { addBigPicture, bigPicture, resetComments } from './big-pictures';
import { isEscapeKey, getRandomElem, debounce } from './util.js';

const TIMEOUT_DELAY = 500;
const COUNT_OF_RANDOM_POSTS = 10;

const pictureTemplate = document.querySelector('#picture').content;
const pictureElement  = pictureTemplate.querySelector('.picture');
const picturesElement = document.querySelector('.pictures');
const imageFiltersForm = document.querySelector('.img-filters__form');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('filter-discussed');
const cmts = document.querySelectorAll('.social__comment');

let newPosts = [];
let tempPosts = [];

const removeComments = () => {
  for (let i = 0; cmts.length; i++) {
    let cmt = document.querySelector('.social__comment');
    cmt.remove();
  }
};

const closeBigPicture = () => {
  removeComments();
  bigPicture.classList.add('hidden');
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
  resetComments();
};

const generateErrorMessage = (message) => {
  const error = document.querySelector('#error').content.querySelector('section').cloneNode(true);
  error.querySelector('h2').textContent = message;
  document.querySelector('body').append(error);
};

const generatePosts = () => {
  tempPosts.forEach((post) => picturesElement.removeChild(post));
  tempPosts = [];
  newPosts.forEach((post) => {
    const pictureClone = pictureElement.cloneNode(true);
    pictureClone.querySelector('.picture__img').src = post.url;
    pictureClone.querySelector('.picture__likes').textContent = post.likes;
    pictureClone.querySelector('.picture__comments').textContent = post.comments.length;
    picturesElement.appendChild(pictureClone);
    tempPosts.push(pictureClone);
    pictureClone.addEventListener('click', () => {
      removeComments();
      addBigPicture(post);
    });
  });

  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closeBigPicture();
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  });
};

const changeFilter = (posts, deb) => {
    imageFiltersForm.addEventListener('click', (evt) => {
      newPosts = [...posts];
      switch (evt.target.id) {
        case 'filter-default':
          defaultFilter.classList.add('img-filters__button--active');
          randomFilter.classList.remove('img-filters__button--active');
          discussedFilter.classList.remove('img-filters__button--active');
          break;
        case 'filter-random':
          defaultFilter.classList.remove('img-filters__button--active');
          randomFilter.classList.add('img-filters__button--active');
          discussedFilter.classList.remove('img-filters__button--active');
          newPosts = getRandomElem(newPosts, COUNT_OF_RANDOM_POSTS);
          break;
        case 'filter-discussed':
          defaultFilter.classList.remove('img-filters__button--active');
          randomFilter.classList.remove('img-filters__button--active');
          discussedFilter.classList.add('img-filters__button--active');
          newPosts.sort((a, b) => b.comments.length - a.comments.length);
          break;
      }
      deb();
    });
  };
  
const renderPosts = (posts) => {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    newPosts = [...posts];
    generatePosts();
    changeFilter(posts, debounce(() => generatePosts(), TIMEOUT_DELAY));
};
  
export { renderPosts, generateErrorMessage };
