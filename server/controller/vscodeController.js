import { app } from 'electron';
import { spawn } from 'child_process';
import { path } from 'path';
import { stat } from 'fs';
import { response } from 'express';


const appName = app.getName();
const getAppPath = path.join(app.getPath('appData'), appName);

const verifyPath = (path) => {
    stat(path, function(err) {
        if(!err){
            console.log('Directory exists');
            return response.status(200).json({
                message: 'No need to create directory'
            });
        } else if(err.code === 'ENONET') {
            console.log(`Directory doesn't exists`);
            return response.status(404).json({
                message: 'Need to create directory'
            });
        }
    });
};

const openVSCode = (args, url) => {
    const response = verifyPath(getAppPath);
    if(response.status === 200) {
        openTerminal(200, args);
    } else {
        openTerminal(404, args);
    }
};

const openTerminal = (statusCode, args) => {
    let command;
    let folderName = args.substr(args.lastIndexOf('/')+1, args.length).split('.git')[0];
    if(statusCode === 200) {
        command = `start cmd.exe /K "cd /D ${gitDeskPath} && cd ${folderName} && code . && exit"`
    } else  {
        command = `start cmd.exe /K "cd /D ${gitDeskPath} && git clone ${args} && cd ${folderName} && code . && exit"`;
    }

    spawn(command, [], { shell: true });
};