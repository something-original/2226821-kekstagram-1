import { generateRandomNumber, getRandomElem, getRandomId } from "./util";

const PHOTOS_NUM = 25;
const LIKES = {min: 15, max: 200};
const ARRAY_ID = Array(PHOTOS_NUM).fill(false);
const ARRAY_URL = Array(PHOTOS_NUM).fill(false);
const NUM_OF_COMMENTS = 8;
const MAX_ID = 25;

const DESCRIPTIONS = [
    'Lovely day',
    'Nice weather',
    'Working on project',
    'Outdoor weekend',
    'Everything in its right place',
    'Hanging out with family',
    'My new car',
    'Enjoying the sun',
    'I love Italy',
    '*Some random description*'
];
  
const NAMES = ['Georgy', 'Sacha', 'Max', 'Benj', 'Josh', 'Drew', 'Callum', 'Toby'];
  
const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const addComment = () => ({
    id: generateRandomNumber(1, 10000),
    avatar: `img/avatar-${generateRandomNumber(1, 6)}.svg`,
    message: getRandomElem(MESSAGES),
    name: getRandomElem(NAMES)
});

const createDescription = () => ({
  id: getRandomId(ARRAY_ID),
  url: `photos/${getRandomId(ARRAY_URL, 1, MAX_ID)}.jpg`,
  description: getRandomElem(DESCRIPTIONS),
  likes: generateRandomNumber(LIKES.min, LIKES.max),
  comments: Array.from({length: NUM_OF_COMMENTS}, addComment)
});

const createDescriptions = () => Array.from({length: PHOTOS_NUM}, createDescription);

export {createDescriptions};
