import * as actionTypes from '../actionTypes/actionTypes';
import * as eventTypes from '../eventTypes/eventTypes';

export const openEditorProcessInit = () => {
    return {
        type: actionTypes.OPEN_EDITOR_PROCESS_INIT
    };
};

export const openEditorProcessStart = () => {
    return {
        type: actionTypes.OPEN_EDITOR_PROCESS_START
    }
};

export const openEditorProcessSuccess = (data) => {
    return {
        type: actionTypes.OPEN_EDITOR_PROCESS_SUCCESS,
        data
    };
};

export const openEditorProcessFail = (error) => {
    return {
        type: actionTypes.OPEN_EDITOR_PROCESS_FAIL,
        error
    };
};

export const openEditorProcess = (repoURL) => {
    const electron = window.require("electron");
    const ipcRenderer  = electron.ipcRenderer;
    return dispatch => {
        dispatch(openEditorProcessInit());
        dispatch(openEditorProcessStart());
        ipcRenderer.send(eventTypes.CLIENT_EVENT, { action: eventTypes.EDITOR_EVENT, repoURL});
    };
};

export const catchEditorProcess = () => {
    const electron = window.require("electron");
    const ipcRenderer  = electron.ipcRenderer;
    return dispatch => {
        ipcRenderer.on(eventTypes.EDITOR_EVENT_REPLY, (event, args) => {
            if(args.status === 200)
                dispatch(openEditorProcessSuccess(args.message));
            else
                dispatch(openEditorProcessFail(args.message));
        });
    };
};