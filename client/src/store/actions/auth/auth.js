import axios from 'axios';
/*import { ipcRenderer } from 'electron';*/
import * as actionTypes from '../actionTypes/actionTypes';
import * as eventTypes from '../eventTypes/eventTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        loading: false
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
        loading: false
    };
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
};

/*
{
'headers': {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5000",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    "Access-Control-Allow-Credentials": true,
},
// withCredentials: true
}
*/

export const auth = () => {
    return dispatch => {
        dispatch(authStart());
        console.log('----------> Auth Start ----------->');
        this.props.history.push('http://localhost:5000/auth/github');
        //const electron = window.require('electron');
        /*electron.ipcRenderer.send(eventTypes.CLIENT_EVENT, {
            action: eventTypes.AUTH_EVENT
        });*/

        /*const filter = {
            urls: ['*://*.google.com/*']
        };
        const session = electron.remote.session
        session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
            details.requestHeaders['Origin'] = null;
            details.headers['Origin'] = null;
            callback({ requestHeaders: details.requestHeaders })
        });*/

        /*axios.get('http://localhost:5000/auth/github')
            .then(response => {
                console.log(response);
                localStorage.setItem('gitHubToken', response);
                dispatch(authSuccess(response));
                dispatch(setAuthRedirectPath('/home'));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });*/
    };
};

export const authReply = () => {
    return dispatch => {
        const electron = window.require('electron');
        electron.ipcRenderer.on(eventTypes.AUTH_EVENT_REPLY, (event, args) => {
            dispatch(authSuccess());
            console.log('auth sucess');
        });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('gitHubToken');
        if(!token){
            dispatch(authLogout());
        } else {
            dispatch(authSuccess());
            dispatch(authCheckState());
        }
    };
};