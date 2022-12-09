const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureTemplate1 = document.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();

const pictureRendering = (pictures) => {
    pictures.forEach((picture) => {
        const pictureElement = pictureTemplate1.cloneNode(true);
        pictureElement.querySelector('.picture__img').src = picture.url;
        pictureElement.querySelector('.picture__likes').textContent = picture.likes;
        pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
        pictureFragment.appendChild(pictureElement);
    });
    pictureListElement.appendChild(pictureFragment);
};

export {pictureRendering}
