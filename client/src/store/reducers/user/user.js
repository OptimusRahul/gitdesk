import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = {
    user: null,
    userType: null,
    userName: null,
    loading: true,
    hasError: false,
    error: null
}

export const fetchUserDataInit = (state, action) => {
    return updateObject(state, action);   
}

export const fetchUserDataStart = (state, action) => {
    return updateObject(state, action);
}

export const fetchUserDataSuccess = (state, action) => {
    return updateObject(state, action);
}


export const fetchUserDataFail = (state, action) => {
    return updateObject(state, action);
}

export const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_DATA_INIT : return fetchUserDataInit(state, action);
        case actionTypes.FETCH_USER_DATA_START : return fetchUserDataStart(state, action);
        case actionTypes.FETCH_USER_DATA_SUCCESS: return fetchUserDataSuccess(state, action);
        case actionTypes.FETCH_USER_DATA_FAIL : return fetchUserDataFail(state, action);
        default: 
            return state
    }
}