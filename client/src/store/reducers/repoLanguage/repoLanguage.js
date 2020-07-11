import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = { 
    language: null,
    hasError: false,
    loading: true
};

export const fetchRepoLangInit = (state, action) => {
    return updateObject(state, action);
};

export const fetchRepoLangStart = (state, action) => {
    return updateObject(state, action);
};

export const fetchRepoLangSuccess = (state, action) => {
    return updateObject(state, action);
};

export const fetchRepoLangFail = (state, action) => {
    return updateObject(state, action);
};

export const repoLanguageReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REPO_LANGUAGE_INIT : return fetchRepoLangInit(state, action);
        case actionTypes.FETCH_REPO_LANGUAGE_START : return fetchRepoLangStart(state, action);
        case actionTypes.FETCH_REPO_LANGUAGE_SUCCESS : return fetchRepoLangSuccess(state, action);
        case actionTypes.FETCH_REPO_LANGUAGE_FAIL : return fetchRepoLangFail(state, action);
        default:
            return state
    }
}