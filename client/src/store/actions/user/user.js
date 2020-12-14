import axios from 'axios';
import * as actionType from '../actionTypes/actionTypes';

export const fetchUserDataInit = () => {
    return {
        type: actionType.FETCH_USER_DATA_INIT
    };
};

export const fetchUserDataStart = () => {
    return {
        type: actionType.FETCH_USER_DATA_START,
        loading: true
    };
};

export const fetchUserDataSuccess = (payload) => {
    return {
        type: actionType.FETCH_USER_DATA_SUCCESS,
        userType: payload.userType,
        user: payload.response,
        userName: payload.userName,
        loading: false,
        hasError: false,
        error: null
    };
};

export const fetchUserDataFail = (payload) => {
    return {
        type: actionType.FETCH_USER_DATA_FAIL,
        userType: payload.userType,
        userName: payload.userName,
        user: null,
        loading: false,
        hasError: true,
        error: payload.error
    };
};

export const fetchAuthenticatedUserData = () => {
    let payload;
    return dispatch => {
        dispatch(fetchUserDataInit());
        dispatch(fetchUserDataStart());
        axios.get(`http://localhost:5000/api/v1/user/me/details`)
            .then(response => {
                payload = {
                    response,
                    userName: response.data.userName,
                    userType: 'owner' 
                }
                dispatch(fetchUserDataSuccess(payload));
            })
            .catch(error => {
                payload = {
                    error,
                    userType: 'owner',
                    userName: ''
                }
                dispatch(fetchUserDataFail(payload));
            });
    };
};

export const fetchSearchedUserData = (userName) => {
    console.log('----------------------------------------------------->', userName);
    let payload;
    return dispatch => {
        dispatch(fetchUserDataInit());
        dispatch(fetchUserDataStart());
        axios.get(`http://localhost:5000/api/v1/user/search/user/details?userName=${userName}`)
            .then(response => {
                payload = {
                    response,
                    userName,
                    userType: 'search' 
                }
                console.log(response);
                dispatch(fetchUserDataSuccess(payload));
            })
            .catch(error => {
                console.log(error);
                payload = {
                    error,
                    userType: 'search',
                    userName: ''
                }
                dispatch(fetchUserDataFail(payload));
            });
    };
};