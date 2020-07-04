import axios from 'axios';
import * as actionTypes from '../actionTypes/actionTypes';

export const fetchUserInit = () => {
    return {
        type: actionTypes.FETCH_USER_DATA_INIT
    };
};

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_DATA_START
    };
};

export const fetchUserSuccess = (data) => {
    return {
        type: actionTypes.FETCH_USER_DATA_SUCCESS,
        data
    };
};

export const fetchUserFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_DATA_FAIL,
        error
    };
};