import axios from 'axios';
import * as actionTypes from '../actionTypes/actionTypes';
import instance from '../../../axios';

export const searchUserListInit = () => {
    return {
        type: actionTypes.SEARCH_USER_LIST_INIT
    };
};

export const searchUserListStart = () => {
    return {
        type: actionTypes.SEARCH_USER_LIST_START
    };
};

export const searchUserListSuccess = (data) => {
    return {
        type: actionTypes.SEARCH_USER_LIST_SUCCESS,
        data
    };
};

export const searchUserListFail = (error) => {
    return {
        type: actionTypes.SEARCH_USER_LIST_FAIL,
        error
    };
};

export const searchUserList = () => {
    return dispatch => {
        dispatch(searchUserListInit());
        dispatch(searchUserListStart());
        axios.get(`${instance}/search/user/list`)
            .then(response => {
                console.log(response);
                dispatch(searchUserListSuccess(response));
            })
            .catch(error => {
                console.log(error);
                dispatch(searchUserListFail(error));
            });
    };
};