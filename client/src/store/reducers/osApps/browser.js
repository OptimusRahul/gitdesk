import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = {

}

const browserProcessInit = (state, action) => {
    return updateObject(state, action);
}

const browserProcessStart = (state, action) => {
    return updateObject(state, action);
}

const browserProcessSuccess = (state, action) => {
    return updateObject(state, action);
}

const browserProcessFail = (state, action) => {
    return updateObject(state, action);
}

export const browserReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_BROWSER_PROCESS_INIT : return browserProcessInit(state, action);
        case actionTypes.OPEN_BROWSER_PROCESS_START : return browserProcessStart(state, action);
        case actionTypes.OPEN_BROWSER_PROCESS_SUCCESS: return browserProcessSuccess(state, action);
        case actionTypes.OPEN_BROWSER_PROCESS_FAIL : return browserProcessFail(state, action);
        default: 
            return state;
    }
}