//import axios from 'axios';
import axios from '../../../axios';
import * as actionTypes from '../actionTypes/actionTypes';
import { fetchOwnerRepoInit, fetchOwnerRepoFail } from '../owner/ownerRepo';

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

export const fetchUserRepo = () => {
    return dispatch => {
        dispatch(fetchOwnerRepoInit());
        dispatch(fetchUserRepoStart());
        axios.get('/search/user/repo')
            .then(response => {
                console.log(response);
                dispatch(fetchUserRepoSuccess(response));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOwnerRepoFail(error));
            });
    };
}