import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = {
    loading: true,
    hasError: false,
    repo: null,
    userType: 'owner',
    userName: null,
    paginate: false,
    currentPage: 1,
    lastPageNumber: 1
}

const fetchOwnerRepoInit = (state, action) => {
    return updateObject(state, action);
}

const fetchOwnerRepoStart = (state, action) => {
    return updateObject(state, action);
}

const fetchOwnerRepoSuccess = (state, action) => {
    return updateObject(state, action);
}

const fetchOwnerRepoFail = (state, action) => {
    return updateObject(state, action);
}

export const ownerRepoReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_OWNER_REPO_INIT : return fetchOwnerRepoInit(state, action);
        case actionTypes.FETCH_OWNER_REPO_START : return fetchOwnerRepoStart(state, action);
        case actionTypes.FETCH_OWNER_REPO_SUCCESS: return fetchOwnerRepoSuccess(state, action);
        case actionTypes.FETCH_OWNER_REPO_FAIL : return fetchOwnerRepoFail(state, action);
        default: 
            return state
    }
}