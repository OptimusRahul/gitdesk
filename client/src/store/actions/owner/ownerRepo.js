import axios from 'axios';
import * as actionType from '../actionTypes/actionTypes';
// import instance from '../../../axios';

export const fetchOwnerRepoInit = () => {
    return {
        type: actionType.FETCH_USER_REPO_INIT
    };
};

export const fetchOwnerRepoStart = () => {
    return {
        type: actionType.FETCH_OWNER_REPO_START,
        loading: true
    };
};

export const fetchOwnerRepoSuccess = (data, page) => {
    console.log(data.data.lastPageNumber);
    return {
        type: actionType.FETCH_OWNER_REPO_SUCCESS,
        loading: false,
        repo: data,
        paginate: true,
        currentPage: page,
        lastPageNumber: data.data.lastPageNumber
    };
};

export const fetchOwnerRepoFail = (error) => {
    return {
        type: actionType.FETCH_OWNER_REPO_FAIL,
        loading: false,
        error
    };
};

export const fetchOwnerRepo = (lastPageNumber, userName, paginated, page = 1, per_page = 10) => {
    return dispatch => {
        dispatch(fetchOwnerRepoInit());
        dispatch(fetchOwnerRepoStart());
        axios.get(`http://localhost:5000/api/v1/user/me/repos?userName=${userName}&page=${page}&per_page=${per_page}&paginate=${paginated}&lastPageNumber=${lastPageNumber}`)
            .then(response => {
                console.log(response);
                dispatch(fetchOwnerRepoSuccess(response, page));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOwnerRepoFail(error));
            });
    };
};