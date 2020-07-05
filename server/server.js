import { app, BrowserWindow, ipcMain } from 'electron';
import { checkEvent } from './services/services';
import { clientEvent } from './utility/config';
import {  } from 'app';

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: `${__dirname}/preload.js`;
        }
    });

    mainWindow.loadURL('http://localhost:3000');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
};

ipcMain.on(clientEvent, (event, args, callback) => {
    checkEvent(event, args);
})

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if(mainWindow === null) {
        createWindow();
    }
});