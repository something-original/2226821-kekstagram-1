import { renderPosts, generateErrorMessage } from './rendering.js';
import { get } from './api.js';
import { addForm } from './userForm.js';
import { funValidate } from './validation.js';
import { imgLoading } from './image-loading';

get(renderPosts, generateErrorMessage);//get info from the server
addForm();
funValidate();
imgLoading();
