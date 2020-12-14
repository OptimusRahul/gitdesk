import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = {
    loading: true,
    hasError: false,
    repo: null,
    error: null,
    userType: null,
    userName: null,
    paginate: false,
    currentPage: 1,
    lastPageNumber: 1
}

const fetchUserRepoInit = (state, action) => {
    return updateObject(state, action);
}

const fetchUserRepoStart = (state, action) => {
    return updateObject(state, action);
}

const fetchUserRepoSuccess = (state, action) => {
    return updateObject(state, action);
}

const fetchUserRepoFail = (state, action) => {
    return updateObject(state, action);
}

export const userRepoReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_REPO_INIT : return fetchUserRepoInit(state, action);
        case actionTypes.FETCH_USER_REPO_START : return fetchUserRepoStart(state, action);
        case actionTypes.FETCH_USER_REPO_SUCCESS: return fetchUserRepoSuccess(state, action);
        case actionTypes.FETCH_USER_REPO_FAIL : return fetchUserRepoFail(state, action);
        default: 
            return state
       }
}