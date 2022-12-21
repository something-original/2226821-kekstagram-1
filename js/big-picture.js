const STEP = 5;
const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

const bigPictureElement = document.querySelector('.big-picture');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

let postCommentsCounter = 0;
let loadedCommentsCounter = 0;
let commentsInPost = 0;

const generateComments = (comments) => {
  for (const comment of comments) {
    loadedCommentsCounter++;
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = AVATAR_WIDTH;
    img.height = AVATAR_HEIGHT;

    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);
    bigPictureElement.querySelector('.social__comments').appendChild(li);
    if (loadedCommentsCounter === postCommentsCounter) {
      commentsLoaderElement.classList.add('hidden');
    }
  }
};

const cutComments = (comments) => {
  generateComments(comments.slice(loadedCommentsCounter, loadedCommentsCounter + STEP));
  document.querySelector('.current-comments-count').textContent = loadedCommentsCounter;
};

const showMoreComments = (evt) => {
  evt.preventDefault();
  cutComments(commentsInPost);
};

const addBigPicture = (post) => {
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = post.url;
  bigPictureElement.querySelector('.likes-count').textContent = post.likes;
  commentsInPost = post.comments;
  bigPictureElement.querySelector('.comments-count').textContent = commentsInPost.length.toString();
  postCommentsCounter = commentsInPost.length;
  cutComments(commentsInPost);
  commentsLoaderElement.addEventListener('click', showMoreComments);
  bigPictureElement.querySelector('.social__caption').textContent = post.description;
  document.querySelector('body').classList.add('modal-open');
};

const resetComments = () => {
  loadedCommentsCounter = 0;
  postCommentsCounter = 0;
};

export { addBigPicture, bigPictureElement, resetComments };
