const electron = require('electron');
const shell = electron.shell;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const session = electron.session;
const dialog = electron.dialog;
const electronLocalshortcut = require('electron-localshortcut');
const apiRequests = require('superagent'); 
const child_process = require('child_process');
const config = require('./config');

const path = require('path');
const fs = require('fs-extra');
const appName = app.getName();
const getAppPath = path.join(app.getPath('appData'), appName);

const options = {
    client_id: config.key,
    client_secret: config.secret,
    scopes: ['repo']
};

let access_token;
let githubURL = 'https://github.com/login/oauth/authorize?';
let authURL = githubURL + 'client_id=' + options.client_id + '&scope=' + options.scopes[0];

let gitDeskPath = 'C:\\Users\\Rahul\\Documents\\gitDesk';
let mkdirCMD = 'mkdir gitDesk';

fs.stat(gitDeskPath, function(err){
    if(!err){
        console.log('Diretory exists');
    }
    else if (err.code === 'ENOENT') {
        console.log('file or directory does not exist');
        gitDeskPath = 'C:\\Users\\Rahul\\Documents' + ' && ' + mkdirCMD;
    }
});

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                preload: __dirname + '/preload.js'
            }});

    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    mainWindow.on('focus', (event) => {
        electronLocalshortcut.register(mainWindow, ['CommandOrControl+R','CommandOrControl+Shift+R', 'F5'], () => {})
    })
    
    mainWindow.on('blur', (event) => {
        electronLocalshortcut.unregisterAll(mainWindow)
    })
}

function requestGithubToken(options, code, event){
    
    apiRequests
        .post('https://github.com/login/oauth/access_token', {
        client_id: options.client_id,
        client_secret: options.client_secret,
        code: code,
        })
        .end(function (err, response) {
        if (response && response.ok) {
            access_token = response.body.access_token;
            console.log('access_token', access_token);
            window.localStorage.setItem('githubToken', access_token);
            event.sender.send('github-oauth-reply', access_token);
            return access_token;
        } else {
            console.log(err);
        }
        });
}

function handleCallback(url, event) {
    let code;
    if(url)
        code = url.split('?code=')[1];
    if(code === 'undefined' || code === 'null'){
        mainWindow.loadURL('http://localhost:3000');
    }
    console.log(code);
    if(code){
        requestGithubToken(options, code, event);
    } else  {
        console.log("Oops! Something went wrong and we couldn't" + 'log you in using Github. Please try again.' );
    }
    console.log('handler CallBack Ended');
}

function loadAuthURL(event){
    mainWindow.loadURL(authURL);

    mainWindow.webContents.on('will-navigate', function(event, url){
        console.log('Inside Will Navigate:', url);
        handleCallback(url, event);
    });

    mainWindow.webContents.on('will-redirect', function(event, oldURL, newURL){
        console.log('newURL', newURL);
        handleCallback(newURL, event);
    });
}

function checkPathExists(dir) {
    console.log('Inside Check')
    if(gitDeskPath.match(' && ')){
        let temp = gitDeskPath;
        if(temp.split(' && ')[1].trim() === mkdirCMD){
            console.log('gitDesk doesnot exist')
            return false;
        }
    } else {
        let temp = gitDeskPath + `\\${dir}`; 
        try{
            fs.statSync(temp);
            console.log('Repo Exist')
            return true;
        } catch(err){ 
            if (err.code === 'ENOENT') {
                console.log('Repo Doesnot exist');
                return false;
            }
        }
    }
}

function openCMD(args) {
    let command;
    let folderName = args.substr(args.lastIndexOf('/')+1, args.length).split('.git')[0];
    if(checkPathExists(folderName)){
        command = `start cmd.exe /K "cd /D ${gitDeskPath} && cd ${folderName} && code . && exit"`
    } else {
        command = `start cmd.exe /K "cd /D ${gitDeskPath} && git clone ${args} && cd ${folderName} && code . && exit"`;

    }
    console.log(command);
    let bat = child_process.spawn(command, [], { shell: true});
    
    bat.stdout.on("data", (data) => {
        // Handle data...
        console.log('data', data);
    });
    
    bat.stderr.on("data", (err) => {
        // Handle error...
        console.log('err', err);
    });
    
    bat.on("exit", (code) => {
        // Handle exit
        console.log('exit', code);
    });
}


app.on('ready', createWindow);
app.setMaxListeners(0);

ipcMain.on('auth', (event, args) => {
    console.log('Hello from main : ', args);
    loadAuthURL(event);
    let timer = setInterval(function(){
        if(access_token){
            console.log('access', access_token);
            if(typeof window !== "undefined"){
                window.localStorage.setItem('token', access_token);
            }
            event.sender.send('github-oauth-reply', access_token);
            clearInterval(timer);
        }
    }, 1000);
});

ipcMain.on('open-chrome', (event, args) => {
    shell.openExternal(args);
    event.sender.send('chrome-window-reply', 'success');
});

function execute(command, callback) {
    child_process.spawn(
        command, { detached: true }
    );
}

ipcMain.on('open-vs-code', (event, args) => {
    openCMD(args);
});

ipcMain.on('logout', (event, args) => {
    
});

ipcMain.on('sign-with-different-account', (event, args) => {
    event.preventDefault();    
    let options  = {
        buttons: ["Yes","No","Cancel"],
        message: "Do you really want to quit?"
    };
    session.defaultSession.clearStorageData([], function(data) {
        console.log('deleted', data);
        /*fs.unlink(getAppPath, () => {
            app.relaunch();
        })*/
        dialog.showMessageBox(options);
        event.sender.send('sign-with-different-account-reply', 'success');
        app.relaunch();
    });

    event.sender.send('sign-with-different-account-reply', 'success');
    
    // console.log(win, ses);
    // ses.clearCache(() => {
    //     console.log('cleared');
    // });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});


app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});