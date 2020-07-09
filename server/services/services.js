import { shell } from 'electron';
import { clientConfiguration,  } from '../config/config';
import { responseObj } from '../utility/responseObject';
import { openVSCode } from '../controller/vscodeController';
import { oauthGithub } from '../controller/authController';

export const checkEvent = (mainWindow, event, args) => {
    switch(args.action){
        case clientConfiguration.authEvent: 
            oauthGithub(mainWindow);
            break;
        case clientConfiguration.browserEvent:
            shell.openExternal(args.url);
            event.sender.send(
                `${clientConfiguration.browserEventReply}`, 
                responseObj(200, 'success', 'Browser Action Successful')
            );
            break;
        case clientConfiguration.editorEvent:
            console.log('editor');
            openVSCode(args.repoURL);
            break;
        default:
            /*event.sender.send(
                `${clientConfiguration.invalidClientEvent}`, 
                setzxReponseMessage(404, 'fail', 'Invalid Action')
            );*/
    }
};