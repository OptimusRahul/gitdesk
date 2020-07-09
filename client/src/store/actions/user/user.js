import axios from '../../../axios';
import * as actionTypes from '../actionTypes/actionTypes';
import { fetchOwnerRepoInit } from '../owner/ownerRepo';
import instance from '../../../axios';
import { fetchOwnerDataFail } from '../owner/owner';

export const fetchUserDataInit = () => {
    return {
        type: actionTypes.FETCH_USER_DATA_INIT
    };
};

export const fetchUserDataStart = () => {
    return {
        type: actionTypes.FETCH_USER_DATA_START
    };
};

export const fetchUserDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_USER_DATA_SUCCESS,
        data
    };
};

export const fetchUserDataFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_DATA_FAIL,
        error
    };
};

export const fetchUserData = () => {
    return dispatch => {
        dispatch(fetchUserDataInit());
        dispatch(fetchUserDataStart());
        axios.get('/search/user/details')
            .then(response => {
                console.log(response);
                dispatch(fetchUserDataSuccess(response));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOwnerDataFail(error));
            });
    };
}