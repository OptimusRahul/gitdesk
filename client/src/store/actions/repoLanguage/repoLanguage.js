import axios from 'axios';
import * as actionTypes from '../actionTypes/actionTypes';

export const searchRepoLangInit = () => {
    return {
        type: actionTypes.FETCH_OWNER_REPO_INIT
    };
};

export const searchRepoLangStart = () => {
    return {
        type: actionTypes.FETCH_OWNER_REPO_START
    };
};

export const searchRepoLangSuccess = () => {
    return {
        type: actionTypes.FETCH_OWNER_REPO_SUCCESS
    };
};

export const searchRepoLangFail = () => {
    return {
        type: actionTypes.FETCH_OWNER_REPO_FAIL
    };
};

export const getRepoLanguage = (user, repoURL) => {

    return dispatch => {
        dispatch(searchRepoLangInit());
        dispatch(searchRepoLangStart());
        axios.get('http://localhost:5000/user/repo/language')
            .then(res => {
                dispatch(searchRepoLangSuccess());
                console.log(res);
            })
            .catch(err => {
                dispatch(searchRepoLangFail());
                console.log(err);
            });
    }
};