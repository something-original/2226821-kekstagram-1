const DESCRIPTIONS = [
  'Lovely day', 'Nice weather', 'Working on project', 'Outdoor weekend', 
  'Everything in its right place', 'Hanging out with family', 'My new car',
  'Enjoying the sun', 'I love Italy', '*Some random description*'
];

const NAMES = [
  'Georgy', 'Sacha', 'Max', 'Benj', 'Josh', 'Drew', 'Callum', 'Toby' 
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


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
  description: getRandomElem
  (DESCRIPTIONS),
  likes: generateRandomNumber(15, 200),
  comments: Array.from({length: generateRandomNumber(1, 6)}, addComment)
});

Array.from({length: 25}, createDescription);

generateRandomNumber(83, 505); //test
isUnderMaximum('Something original', 15);//test