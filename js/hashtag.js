const MAX_LENGTH = 20;
const MIN_LENGTH = 2;
const MAX_NUMBER = 5;

const hashtag = document.querySelector('.text__hashtags');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

let errorMessage = "";
const error = () => errorMessage;

const pristine = new pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field--invalid',
    successClass: 'img-upload__field--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass : 'img-upload__error'
});

const hashtagsHandler = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const requirements = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег начинается с символа #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_LENGTH),
      error: `Длина хеш-тега не должна превышать ${MAX_LENGTH} символов`,
    },
    {
      check: inputArray.length > MAX_NUMBER,
      error: `Нельзя использовать больше ${MAX_NUMBER} хеш-тегов`,
    },
    {
      check: inputArray.some((item) => item.length < MIN_LENGTH),
      error: 'Хэш-тег не может состоять только из одной решётки',
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    }
  ];

  return requirements.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(hashtag, hashtagsHandler, error, 2, false);

const onHashtagInput = () => {
  if (pristine.validate()) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'disabled');
  }
};

hashtag.addEventListener('input', onHashtagInput);

export {hashtag};
