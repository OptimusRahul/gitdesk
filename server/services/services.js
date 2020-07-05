import { ipcMain } from 'electron';
import { clientEvent } from '../utility/configuration';
import { auth, browser, editor} from '../../shared/shared';

const setReponseMessage = (statusCode, status, message) => {
    const reponseObject = {
        statusCode,
        status,
        message
    };

    return reponseObject;
};

const executeEvent = (event, args) => {
    ipcMain.on(args.action, (event, args) => {
        console.log(`${args.action} executed`);
        event.sender.send(`${clientEvent}-${args.action}-response`, setReponseMessage(200, 'success', 'Auth Successful'));
    });
};

export const checkEvent = (event, args) => {
    switch(args.action){
        case auth:
            console.log('auth');
            executeEvent(event, args);
            break;
        case browser:
            console.log('chrome');
            executeEvent(event, args);
            break;
        case editor:
            console.log('editor');
            executeEvent(event, args);
            break;
        default:
            event.sender.send(`${clientEvent}-response`, setReponseMessage(404, 'fail', 'No action exists');
    }
};