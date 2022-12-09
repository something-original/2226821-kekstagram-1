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
  
const getRandomElem = (elements) => elements[generateRandomNumber(0, elements.length - 1)];
   
const getRandomId = (arrayOfNum) => {
  for (let i = 0; i < arrayOfNum.length; i++) {
    if (!arrayOfNum[i]) {
      arrayOfNum[i] = true;
      return i + 1;
    }
  }
}  

export {generateRandomNumber, isUnderMaximum, getRandomElem, addComment, createDescription, getRandomId};
