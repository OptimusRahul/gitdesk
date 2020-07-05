import { shell } from 'electron';

export const openBrowser = (event, url) => {
    shell.openExternal(url);
    return 'success';
};