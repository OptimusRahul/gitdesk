import axios from 'axios';
import electron from 'electron';
import { githubConfiguration } from '../config/config';

export const oauthGithub = (mainWindow) => {
    const authURL = `${githubConfiguration.oauthBaseURL}?client_id=${githubConfiguration.clientID}&scope=${githubConfiguration.scope}`;
    console.log(authURL);
    console.log(electron.remote.getCurrentWindow);
    mainWindow.loadURL(authURL);
};