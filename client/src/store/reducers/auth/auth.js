import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = {

}

const authStart = (state, action) => {
    return updateObject(state, action);
}

const authSuccess = (state, action) => {
    return updateObject(state, action);
}

const authFail = (state, action) => {
    return updateObject(state, action);
}

const authLogout = (state, action) => {
    return updateObject(state, action);
}

export const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START : return authStart(state, action);
        case actionTypes.AUTH_SUCCESS : return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT : return authLogout(state, action);
        default: 
            return state
    }
}