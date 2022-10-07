const generateRandomNumber = (min, max) => {
    if (min >= max) {
      throw new Error('Max(string is less or equals the min(string');
    }
    if (min < 0 || max < 0) {
      throw new Error('Negative range');
    }
    const min = Math.ceil(min);
    const max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

const isUnderMaximum = (string, maxLength) => maxLength >=(string.length);

getRandomInt(83, 505); 
isUnderMaximum('Something original', 15);