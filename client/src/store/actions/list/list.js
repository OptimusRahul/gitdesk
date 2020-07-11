import axios from 'axios';
import * as actionTypes from '../actionTypes/actionTypes';
//import instance from '../../../axios';

export const searchUserListInit = () => {
    return {
        type: actionTypes.SEARCH_USER_LIST_INIT
    };
};

export const searchUserListStart = () => {
    return {
        type: actionTypes.SEARCH_USER_LIST_START
    }
};

export const searchUserListSuccess = (payload, userName) => {
    return {
        type: actionTypes.SEARCH_USER_LIST_SUCCESS,
        user: userName,
        usersList: JSON.parse(payload.data.data).data.items,
        total_count: JSON.parse(payload.data.data).data.total_count,
        loading: false
    };
};

export const searchUserListFail = (error) => {
    return {
        type: actionTypes.SEARCH_USER_LIST_FAIL,
        error
    };
};

export const searchUserList = (userName, page = 1, perPage = 30) => {
    return dispatch => {
        console.log(userName);
        dispatch(searchUserListInit());
        dispatch(searchUserListStart());
        axios.get(`http://localhost:5000/api/v1/user/search/user/list?userName=${userName}&page=${page}&perPage=${perPage}`)
            .then(response => {
                console.log(JSON.parse(response.data.data).data);
                dispatch(searchUserListSuccess(response, userName));
            })
            .catch(error => {
                console.log(error);
                dispatch(searchUserListFail(error));
            });
    };
};