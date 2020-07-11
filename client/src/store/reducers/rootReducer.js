import { authReducer } from './auth/auth.js';
import { ownerReducer } from './owner/owner';
import { ownerRepoReducer } from './owner/ownerRepo';
import { userReducer } from './user/user';
import { userRepoReducer } from './user/userRepo';
import { listReducer } from './list/list';
import { createOwnerRepoReducer } from './createRepo/createRepo';
import { browserReducer } from './osApps/browser';
import { editorReducer } from './osApps/editor';
import { repoLanguageReducer } from './repoLanguage/repoLanguage';

import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    auth: authReducer,
    owner: ownerReducer,
    ownerRepo: ownerRepoReducer,
    createOwnerRepo: createOwnerRepoReducer,
    repoLanguage: repoLanguageReducer,
    user: userReducer,
    userRepo: userRepoReducer,
    searchUser: listReducer,
    browser: browserReducer,
    editor: editorReducer
});