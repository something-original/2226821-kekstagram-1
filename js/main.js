import { renderPosts, generateErrorMessage } from './rendering.js';
import { get } from './api.js';
import { addForm } from './userForm.js';
import { funValidate } from './validation.js';
import { imgLoading } from './image-loading.js';

get(renderPosts, generateErrorMessage);
addForm();
funValidate();
imgLoading();
