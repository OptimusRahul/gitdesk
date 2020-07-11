import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = {
    user: null,
    userType: null,
    userName: null,
    loading: true,
}

export const fetchOwnerDataInit = (state, action) => {
    return updateObject(state, action);   
}

export const fetchOwnerDataStart = (state, action) => {
    return updateObject(state, action);
}

export const fetchOwnerDataSuccess = (state, action) => {
    return updateObject(state, action);
}

export const fetchOwnerDataFail = (state, action) => {
    return updateObject(state, action);
}

export const ownerReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_OWNER_DATA_INIT : return fetchOwnerDataInit(state, action);
        case actionTypes.FETCH_OWNER_DATA_START : return fetchOwnerDataStart(state, action);
        case actionTypes.FETCH_OWNER_DATA_SUCCESS: return fetchOwnerDataSuccess(state, action);
        case actionTypes.FETCH_OWNER_DATA_FAIL : return fetchOwnerDataFail(state, action);
        default: 
            return state
    }
}