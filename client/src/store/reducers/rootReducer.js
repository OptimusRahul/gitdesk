import { combineReducers } from 'redux';

import { authReducer } from './auth/auth.js';
import { userReducer } from './user/user';
import { userRepoReducer } from './user/userRepo';
import { listReducer } from './list/list';
import { createOwnerRepoReducer } from './createRepo/createRepo';
import { browserReducer } from './osApps/browser';
import { editorReducer } from './osApps/editor';

export const rootReducer = combineReducers({
    auth: authReducer,
    owner: userReducer,
    ownerRepo: userRepoReducer,
    createOwnerRepo: createOwnerRepoReducer,
    searchUser: listReducer,
    browser: browserReducer,
    editor: editorReducer
});