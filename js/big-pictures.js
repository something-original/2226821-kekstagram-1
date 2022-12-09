const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentListElement = document.querySelector('.social__comments');
const commentsFragment = document.createDocumentFragment();

const renderComments = (comments) => {
  comments.forEach((comment) => {
    const socialComment = document.querySelector('.social__comment').cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(socialComment);
  });

  commentListElement.innerHTML = '';
  commentListElement.appendChild(commentsFragment);
};

const renderPicture = (picture) => {
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  renderComments(picture.comments);
};

const closePicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const escKeydown = (evt) => {
  if(evt.key === 'Escape') {
    closePicture();
    document.removeEventListener('keydown', escKeydown);
  }
};

const closeButton = () => {
  closePicture();
  bigPictureCancel.removeEventListener('click', closeButton);
  document.removeEventListener('keydown', escKeydown);
};

const openBigPicture = (item) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  renderPicture(item);
  bigPictureCancel.addEventListener('click', closeButton);
  document.addEventListener('keydown', escKeydown);
};

export { openBigPicture };
