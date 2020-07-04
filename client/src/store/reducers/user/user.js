import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = {

}

const fetchUserInit = (state, action) => {
    return updateObject(state, action);
}

const fetchUserStart = (state, action) => {
    return updateObject(state, action);
}

const fetchUserSuccess = (state, action) => {
    return updateObject(state, action);
}

const fetchUserFail = (state, action) => {
    return updateObject(state, action);
}

export const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_DATA_INIT : return fetchUserInit(state, action);
        case actionTypes.FETCH_USER_DATA_START : return fetchUserStart(state, action);
        case actionTypes.FETCH_USER_DATA_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_DATA_FAIL : return fetchUserFail(state, action);
        default: 
            return state
    }
}