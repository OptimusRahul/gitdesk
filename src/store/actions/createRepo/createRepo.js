import axios from 'axios';
import * as actionType from '../actionTypes/actionTypes';

export const createOwnerRepoInit = () => {
    return {
        type: actionType.CREATE_OWNER_REPO_INIT
    };
};

export const createOwnerRepoStart = () => {
    return {
        type: actionType.CREATE_OWNER_REPO_START
    };
};

export const createOwnerRepoSuccess = (data) => {
    return {
        type: actionType.CREATE_OWNER_REPO_SUCCESS,
        data
    };
};

export const createOwnerRepoFail = (error) => {
    return {
        type: actionType.CREATE_OWNER_REPO_FAIL,
        error
    };
};