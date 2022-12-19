const STEP = 5;
const CMT_IMG_WIDTH = 35;
const CMT_IMG_HEIGHT = 35;

const bigPicture = document.querySelector('.big-picture');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');

let totalCmtsInPost = 0;
let cmtCntr = 0;

const generateComments = (comments) => {
  comments.array.forEach(comment => {
      const cmt = document.createElement('li');
      const cmtImg = document.createElement('img');
      const cmtText = document.createElement('p');
      cmt.classList.add('social__comment');
      cmtImg.classList.add('social__picture');
      cmtImg.src = comment.avatar;
      cmtImg.alt = comment.name;
      cmtImg.width = CMT_IMG_WIDTH;
      cmtImg.height = CMT_IMG_HEIGHT;
      cmtText.classList.add('social__text');
      cmtText.textContent = comment.message;
      cmt.appendChild(cmtImg);
      cmt.appendChild(cmtText);
      socialComments.appendChild(cmt);
      cmtCntr++;
      if (cmtCntr === totalCmtsInPost) {
        commentsLoader.classList.add('hidden');
      }
  });
};

let cmtsInPost;
const showMoreCmts = (evt) => {
  evt.preventDefault();
  generateComments(cmtsInPost.slice(cmtCntr, cmtCntr + STEP));
  document.querySelector('.current-comments-count').textContent = cmtCntr;
}

const addBigPicture = (post) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  cmtsInPost = post.comments;
  cutComments(cmtsInPost);
  totalCmtsInPost = cmtsInPost.length;
  commentsLoader.addEventListener('click', showMoreCmts);
  bigPicture.querySelector('.comments-count').textContent = cmtsInPost.length.toString();
  bigPicture.querySelector('.social__caption').textContent = post.description;
  document.querySelector('body').classList.add('modal-open');
};

const resetComments = () => {
  cmtCntr = 0;
  totalCmtsInPost = 0;
}

export {addBigPicture, bigPicture, resetComments};
