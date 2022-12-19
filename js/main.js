import { renderPictures } from './rendering.js';
import { getData } from './api.js';
import { addForm } from './userForm.js';
import { validate } from './validation.js';

getData(renderPictures, generateErrorMessage);
addForm();
validate();
