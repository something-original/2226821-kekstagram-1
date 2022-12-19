import {createDescriptions} from './data.js'
import { pictureRendering } from './rendering.js';
import { getData } from './api.js';
import { addForm } from './userForm.js';
import { validate } from './validation.js';

getData(pictureRendering, generateErrorMessage);
addForm();
validate();
