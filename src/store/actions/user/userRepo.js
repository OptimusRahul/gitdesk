import axios from 'axios';
import * as actionTypes from '../actionTypes/actionTypes';

export const fetchUserRepoInit = () => {
    return {
        type: actionTypes.FETCH_USER_REPO_INIT
    };
};

export const fetchUserRepoStart = () => {
    return {
        type: actionTypes.FETCH_USER_REPO_START
    };
};

export const fetchUserRepoSuccess = (data) => {
    return {
        type: actionTypes.FETCH_USER_REPO_SUCCESS,
        data
    };
};

export const fetchUserRepoFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_REPO_FAIL,
        error
    };
};