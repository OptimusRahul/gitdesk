const { shell } = require('electron');

export const openBrowser = (event, url) => {
    shell.openExternal(url);
    return 'success';
};