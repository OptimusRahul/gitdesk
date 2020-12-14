import * as actionTypes from '../../actions/actionTypes/actionTypes';
import { updateObject } from '../../../utility/utility';

const initalState = {

}

const editorProcessInit = (state, action) => {
    return updateObject(state, action);
}

const editorProcessStart = (state, action) => {
    return updateObject(state, action);
}

const editorProcessSuccess = (state, action) => {
    return updateObject(state, action);
}

const editorProcessFail = (state, action) => {
    return updateObject(state, action);
}

export const editorReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_EDITOR_PROCESS_INIT : return editorProcessInit(state, action);
        case actionTypes.OPEN_EDITOR_PROCESS_START : return editorProcessStart(state, action);
        case actionTypes.OPEN_EDITOR_PROCESS_SUCCESS: return editorProcessSuccess(state, action);
        case actionTypes.OPEN_EDITOR_PROCESS_FAIL : return editorProcessFail(state, action);
        default: 
            return state;
    }
}