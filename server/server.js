import { app, BrowserWindow, ipcMain } from 'electron';
import { checkEvent } from './services/services';
import { clientConfiguration, applicationConfiguration } from './config/config';
import { responseObj } from './utility/responseObject';
import { notificationWindow } from './notification/notification';
//import 'react-devtools-electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
//import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import path from 'path';
import os from 'os';
import { mainApp } from './app';

let mainWindow;

const notification = {
    title: applicationConfiguration.appTitle,
    body: 'Welcome To GitDesk',
    icon: applicationConfiguration.icon.appIcon
}


function createWindow() {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        }
    });

    notificationWindow(notification);

    installExtension(REACT_DEVELOPER_TOOLS)
        .then(name => {
            //console.log(`Added Extension: ${name}`);
        })
        .catch(err => {
            //console.log(`An error occured: ${err}`);
        });

    installExtension(REDUX_DEVTOOLS)
        .then(name => {
            //console.log(`Added Extension: ${name}`);
        })
        .catch(err => {
            //console.log(`An error occured: ${err}`);
        });

    mainWindow.loadURL('http://localhost:3000');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    /*BrowserWindow.addDevToolsExtension(
        "C:\\Users\\Rahul\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.7.0_0"
    );*/
};

ipcMain.on(clientConfiguration.clientEvent, (event, args) => {
    console.log(args);
    checkEvent(mainWindow, event, args);
    event.sender.send(
        clientConfiguration.clientEventReply,
        responseObj(102, 'In-Progress', 'Request Received Successfully, Processing...')
    );
})

app.on('ready', () => {
    //app.setAppUserModelId("GitDesk-App"); //If Notification doesn't work try this.
    createWindow();
});

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