import axios from 'axios';
import * as actionType from '../actionTypes/actionTypes';

export const fetchUserRepoInit = () => {
    return {
        type: actionType.FETCH_USER_REPO_INIT
    };
};

export const fetchUserRepoStart = () => {
    return {
        type: actionType.FETCH_USER_REPO_START,
        loading: true
    };
};

export const fetchUserRepoSuccess = (payload) => {
    console.log(payload.response);
    return {
        type: actionType.FETCH_USER_REPO_SUCCESS,
        loading: false,
        hasError: false,
        repo: payload.response,
        userType: payload.userType,
        userName: payload.userName,
        paginate: true,
        currentPage: payload.page,
        lastPageNumber: payload.response.data.lastPageNumber
    };
};

export const fetchUserRepoFail = (payload) => {
    return {
        type: actionType.FETCH_USER_REPO_FAIL,
        loading: false,
        hasError: true,
        error: payload.error
    };
};

export const fetchAuthenticatedUserRepo = (lastPageNumber, userName, paginated, page = 1, per_page = 10) => {
    console.log(lastPageNumber, userName, paginated);
    let payload;
    return dispatch => {
        dispatch(fetchUserRepoInit());
        dispatch(fetchUserRepoStart());
        axios.get(`http://localhost:5000/api/v1/user/me/repos?userName=${userName}&page=${page}&per_page=${per_page}&paginate=${paginated}&lastPageNumber=${lastPageNumber}`)
            .then(response => {
                console.log(response);
                payload = {
                    response,
                    userType: 'owner',
                    userName,
                    page,
                    lastPageNumber
                }
                dispatch(fetchUserRepoSuccess(payload));
            })
            .catch(error => {
                payload = {
                    error
                }
                dispatch(fetchUserRepoFail(payload));
            });
    };
};

export const fetchSearchedUserRepo = (lastPageNumber, userName, paginated, page = 1, per_page = 10) => {
    console.log(lastPageNumber, userName, paginated);

    let payload;
    return dispatch => {
        dispatch(fetchUserRepoInit());
        dispatch(fetchUserRepoStart());
        axios.get(`http://localhost:5000/api/v1/user/search/user/repo?userName=${userName}&page=${page}&per_page=${per_page}&paginate=${paginated}&lastPageNumber=${lastPageNumber}`)
            .then(response => {
                payload = {
                    response,
                    userType: 'search',
                    userName,
                    page,
                    lastPageNumber
                }
                dispatch(fetchUserRepoSuccess(payload));
            })
            .catch(error => {
                payload = {
                    error
                }
                dispatch(fetchUserRepoFail(payload));
            });
    };
};