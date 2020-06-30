import axios from 'axios';
import * as actionType from '../actionTypes/actionTypes';

export const fetchOwnerRepoInit = () => {
    return {
        type: actionType.FETCH_USER_REPO_INIT
    };
};

export const fetchOwnerRepoStart = () => {
    return {
        type: actionType.FETCH_OWNER_REPO_START
    };
};

export const fetchOwnerRepoSuccess = (data) => {
    return {
        type: actionType.FETCH_OWNER_REPO_SUCCESS,
        data
    };
};

export const fetchOwnerRepoFail = (error) => {
    return {
        type: actionType.FETCH_OWNER_REPO_FAIL,
        error
    };
};