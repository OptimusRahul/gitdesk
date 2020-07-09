import axios from 'axios';
import * as actionType from '../actionTypes/actionTypes';
import instance from '../../../axios';

export const fetchOwnerDataInit = () => {
    return {
        type: actionType.FETCH_OWNER_DATA_INIT
    };
};

export const fetchOwnerDataStart = () => {
    return {
        type: actionType.FETCH_OWNER_DATA_START
    };
};

export const fetchOwnerDataSuccess = (data) => {
    return {
        type: actionType.FETCH_OWNER_DATA_SUCCESS,
        data
    };
};

export const fetchOwnerDataFail = (error) => {
    return {
        type: actionType.FETCH_OWNER_DATA_FAIL,
        error
    };
};

export const fetchOwnerData = () => {
    return dispatch => {
        dispatch(fetchOwnerDataInit());
        dispatch(fetchOwnerDataStart());
        axios.get(`${instance}/me/details`)
            .then(response => {
                console.log(response);
                dispatch(fetchOwnerDataSuccess(response));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOwnerDataFail(error));
            });
    };
};