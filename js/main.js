import { renderPictures, generateErrorMessage } from './rendering.js';
import { getData } from './api.js';
import { addForm } from './userForm.js';
import { validate } from './validation.js';
import { imgLoading } from './image-loading';

getData(renderPictures, generateErrorMessage);
addForm();
validate();
imgLoading();