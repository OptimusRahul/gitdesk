import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = {
    user: null,
    usersList: null,
    total_count: 1,
    loading: true,
}

const searchUserInit = (state, action) => {
    return updateObject(state, action);
}

const searchUserStart = (state, action) => {
    return updateObject(state, action);
}

const searchUserSuccess = (state, action) => {
    return updateObject(state, action);
}

const searchUserFail = (state, action) => {
    return updateObject(state, action);
}

export const listReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_USER_LIST_INIT : return searchUserInit(state, action);
        case actionTypes.SEARCH_USER_LIST_START : return searchUserStart(state, action);
        case actionTypes.SEARCH_USER_LIST_SUCCESS: return searchUserSuccess(state, action);
        case actionTypes.SEARCH_USER_LIST_FAIL : return searchUserFail(state, action);
        default: 
            return state
    }
}