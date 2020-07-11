import { app } from 'electron';
import { join } from 'path';
require('dotenv').config();

export const clientConfiguration = {
    clientEvent: 'CLIENT_EVENT',
    clientEventReply: 'CLIENT_EVENT_REPLY',
    authEvent: 'AUTH_EVENT',
    authEventReply: 'AUTH_EVENT_REPLY',
    browserEvent: 'BROWSER_EVENT',
    browserEventReply: 'BROWSER_EVENT_REPLY',
    editorEvent: 'EDITOR_EVENT',
    editorEventReply: 'EDITOR_EVENT_REPLY',
    invalidClientEvent: 'INVALID_CLIENT_EVENT'
};

export const applicationConfiguration = {
    appTitle: 'GitDesk',
    icon: {
        appIcon: join(__dirname, '../assets/logo.png'),
        successIcon: join(__dirname, '../assets/success.png'),
        failureIcon: join(__dirname, '../assets/failure.png')
    },
    defaultApplicationPath: app.getPath('documents'),
    customApplicationPath: ``
};

export const githubConfiguration = {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    oauthBaseURL: 'https://github.com/login/oauth/authorize',
    tokenBaseURL: 'https://github.com/login/oauth/access_token',
    scope: 'repo',
    access_token: ''
};

export const urlConfiguration = {
    baseURL: 'https://api.github.com'
};

export const userConfiguration = {
    applicationOwner: null,
    searchedUserName: null
};