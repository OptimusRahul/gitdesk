import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = {

}

const createOwnerRepoInit = (state, action) => {
    return updateObject(state, action);   
}

const createOwnerRepoStart = (state, action) => {
    return updateObject(state, action);
}

const createOwnerRepoSuccess = (state, action) => {
    return updateObject(state, action);
}

const createOwnerRepoFail = (state, action) => {
    return updateObject(state, action);
}

export const createOwnerRepoReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_OWNER_REPO_INIT : return createOwnerRepoInit(state, action);
        case actionTypes.CREATE_OWNER_REPO_START : return createOwnerRepoStart(state, action);
        case actionTypes.CREATE_OWNER_REPO_SUCCESS: return createOwnerRepoSuccess(state, action);
        case actionTypes.CREATE_OWNER_REPO_FAIL : return createOwnerRepoFail(state, action);
        default: 
            return state
    }
}