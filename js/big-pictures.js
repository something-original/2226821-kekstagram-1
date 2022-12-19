const bigPicture = document.querySelector('.big-picture');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const STEP = 5;

let postCommentsCounter = 0;
let loadedCommentsCounter = 0;
let commentsInPost = 0;

const generateComments = (comments) => {
  comments.array.forEach(comment => {
    loadedCommentsCounter++;
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);
    bigPicture.querySelector('.social__comments').appendChild(li);
    if (loadedCommentsCounter === postCommentsCounter) {
      commentsLoader.classList.add('hidden');
    }
  });
};

const cutComments = (comments) => {
  generateComments(comments.slice(loadedCommentsCounter, loadedCommentsCounter + STEP));
  document.querySelector('.current-comments-count').textContent = loadedCommentsCounter;
};

function loadFiveComments(evt) {
  evt.preventDefault();
  cutComments(commentsInPost);
}

const addBigPicture = (post) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  commentsInPost = post.comments;
  cutComments(commentsInPost);
  postCommentsCounter = commentsInPost.length;
  commentsLoader.addEventListener('click', loadFiveComments);
  bigPicture.querySelector('.comments-count').textContent = commentsInPost.length.toString();
  bigPicture.querySelector('.social__caption').textContent = post.description;
  document.querySelector('body').classList.add('modal-open');
};

function resetComments() {
  loadedCommentsCounter = 0;
  postCommentsCounter = 0;
}

export {addBigPicture, bigPicture, resetComments};
