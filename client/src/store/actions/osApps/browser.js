import * as actionTypes from '../actionTypes/actionTypes';
import * as eventTypes from '../eventTypes/eventTypes';

export const openBrowserProcessInit = () => {
    return {
        type: actionTypes.OPEN_BROWSER_PROCESS_INIT
    };
};

export const openBrowserProcessStart = () => {
    return {
        type: actionTypes.OPEN_BROWSER_PROCESS_START
    }
};

export const openBrowserProcessSuccess = (data) => {
    return {
        type: actionTypes.OPEN_BROWSER_PROCESS_SUCCESS,
        data
    };
};

export const openBrowserProcessFail = (error) => {
    return {
        type: actionTypes.OPEN_BROWSER_PROCESS_FAIL,
        error
    };
};

export const openBrowserProcess = () => {
    const electron = window.require("electron");
    const ipcRenderer  = electron.ipcRenderer;
    return dispatch => {
        dispatch(openBrowserProcessInit());
        dispatch(openBrowserProcessStart());
        ipcRenderer.send(eventTypes.CLIENT_EVENT, { action: eventTypes.BROWSER_EVENT });
    }
};

export const catchBrowserProcess = () => {
    const electron = window.require("electron");
    const ipcRenderer  = electron.ipcRenderer;
    return dispatch => {
        ipcRenderer.on(eventTypes.BROWSER_EVENT_REPLY, (event, args) => {
            if(args.status === 200)
                dispatch(openBrowserProcessSuccess(args.message));
            else 
                dispatch(openBrowserProcessFail(args.message));
        });
    }
};