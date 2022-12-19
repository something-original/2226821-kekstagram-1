const MAX_COMMENT_LENGTH = 140;
const COMMENTS_REGEX =  /^#[0-9a-zA-Zа-яА-ЯёЁ]{1,19}$/;

const generateRandomNumber = (minimum, maximum) => {
    if (minimum >= maximum) {
      throw new Error('Max string is less or equals the minimum string');
    }
    if (minimum < 0 || maximum < 0) {
      throw new Error('Negative range');
    }
    minimum = Math.ceil(minimum);
    maximum = Math.floor(maximum);
    return Math.floor(Math.random() *  maximum - minimum + 1) + minimum;
};
  // eslint-disable-next-line no-unused-vars
const isUnderMaximum = (string, maxLength) => maxLength >= (string.length);
  
const getRandomElem = (elements, count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const randElem = elements[generateRandomNumber(0, elements.length - 1)];
    result.push(randElem);
    array.splice(array.indexOf(randElem), 1);
  }
  return result;
};
   
const getRandomId = (arrayOfNum) => {
  for (let i = 0; i < arrayOfNum.length; i++) {
    if (!arrayOfNum[i]) {
      arrayOfNum[i] = true;
      return i + 1;
    }
  }
}  

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return(...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay)
  }
};

export {MAX_COMMENT_LENGTH, COMMENTS_REGEX, generateRandomNumber, isUnderMaximum, getRandomElem, addComment, createDescription, getRandomId, isEscapeKey, debounce};
