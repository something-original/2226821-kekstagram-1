
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
  
  const addComment = () => ({
    id: generateRandomNumber(1, 10000),
    avatar: `img/avatar-${generateRandomNumber(1, 6)}.svg`,
    message: getRandomElem(MESSAGES),
    name: getRandomElem(NAMES)
  });
  
  const createDescription = (id) => ({
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomElem(DESCRIPTIONS),
    likes: generateRandomNumber(15, 200),
    comments: Array.from({length: generateRandomNumber(1, 6)}, addComment)
  });

export {generateRandomNumber, isUnderMaximum, getRandomElem, addComment, createDescription};
