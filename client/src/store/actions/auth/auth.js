import instance from '../../../axios';
import * as actionTypes from '../actionTypes/actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
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

export const auth = () => {
    return dispatch => {
        dispatch(authStart());
        axios.get(`${instance}/me`)
            .then(response => {
                console.log(response);
                localStorage.setItem('gitHubToken', reponse);
                dispatch(authSuccess());
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail());
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