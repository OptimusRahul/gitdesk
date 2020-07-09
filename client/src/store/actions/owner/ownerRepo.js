import axios from 'axios';
import * as actionType from '../actionTypes/actionTypes';
import instance from '../../../axios';

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

export const fetchOwnerRepo = () => {
    return dispatch => {
        dispatch(fetchOwnerRepoInit());
        dispatch(fetchOwnerRepoStart());
        axios.get(`${instance}/me/repos`)
            .then(response => {
                console.log(response);
                dispatch(fetchOwnerRepoSuccess(response));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOwnerRepoFail(error));
            });
    };
};