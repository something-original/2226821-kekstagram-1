import { renderPosts, generateErrorMessage } from './rendering.js';
import { addForm } from './user-form.js';
import { validateInfo } from './validation.js';
import { get } from './api.js';
import { loadImage } from  './image-loading.js';

get(renderPosts, generateErrorMessage);
addForm();
validateInfo();
loadImage();
