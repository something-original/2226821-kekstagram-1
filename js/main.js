const generateRandomNumber = (minimum, maximum) => {
    if (minimum >= maximum) {
      throw new Error('Max(string is less or equals the minimum(string');
    }
    if (minimum < 0 || maximum < 0) {
      throw new Error('Negative range');
    }
    const minimum = Math.ceil(minimum);
    const maximum = Math.floor(maximum);
    return Math.floor(Math.random() *  maximum - minimum + 1)) + minimum;
  };

const isUnderMaximum = (string, maxLength) => maxLength >=(string.length);

getRandomInt(83, 505); 
isUnderMaximum('Something original', 15);