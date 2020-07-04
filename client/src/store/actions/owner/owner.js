import axios from 'axios';
import * as actionType from '../actionTypes/actionTypes';

export const fetchOwnerInit = () => {
    return {
        type: actionType.FETCH_OWNER_DATA_INIT
    };
};

export const fetchOwnerStart = () => {
    return {
        type: actionType.FETCH_OWNER_DATA_START
    };
};

export const fetchOwnerSuccess = (data) => {
    return {
        type: actionType.FETCH_OWNER_DATA_SUCCESS,
        data
    };
};

export const fetchOwnerFail = (error) => {
    return {
        type: actionType.FETCH_OWNER_DATA_FAIL,
        error
    };
};