import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = {

}

const fetchOwnerInit = (state, action) => {
    return updateObject(state, action);   
}

const fetchOwnerStart = (state, action) => {
    return updateObject(state, action);
}

const fetchOwnerSuccess = (state, action) => {
    return updateObject(state, action);
}

const fetchOwnerFail = (state, action) => {
    return updateObject(state, action);
}

export const ownerReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_OWNER_DATA_INIT : return fetchOwnerInit(state, action);
        case actionTypes.FETCH_OWNER_DATA_START : return fetchOwnerStart(state, action);
        case actionTypes.FETCH_OWNER_DATA_SUCCESS: return fetchOwnerSuccess(state, action);
        case actionTypes.FETCH_OWNER_DATA_FAIL : return fetchOwnerFail(state, action);
        default: 
            return state
    }
}