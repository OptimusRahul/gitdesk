import axios from 'axios';
import * as actionTypes from '../actionTypes/actionTypes';

export const searchUserInit = () => {
    return {
        type: actionTypes.SEARCH_USER_LIST_INIT
    };
};

export const searchUserStart = () => {
    return {
        type: actionTypes.SEARCH_USER_LIST_START
    };
};

export const searchUserSuccess = (data) => {
    return {
        type: actionTypes.SEARCH_USER_LIST_SUCCESS,
        data
    };
};

export const searchUserFail = (error) => {
    return {
        type: actionTypes.SEARCH_USER_LIST_FAIL,
        error
    };
};