import axios from 'axios';
import * as actionType from '../actionTypes/actionTypes';
//import axios from 'axios';

export const fetchOwnerDataInit = () => {
    return {
        type: actionType.FETCH_OWNER_DATA_INIT
    };
};

export const fetchOwnerDataStart = () => {
    return {
        type: actionType.FETCH_OWNER_DATA_START,
        loading: true
    };
};

export const fetchOwnerDataSuccess = (data, userName) => {
    return {
        type: actionType.FETCH_OWNER_DATA_SUCCESS,
        userType: 'owner',
        user: data,
        userName,
        loading: false
    };
};

export const fetchOwnerDataFail = (error) => {
    return {
        type: actionType.FETCH_OWNER_DATA_FAIL,
        userType: 'owner',
        user: error,
        loading: false
    };
};

export const fetchOwnerData = () => {
    console.log('[FetchOwnerData] called');
    return dispatch => {
        dispatch(fetchOwnerDataInit());
        dispatch(fetchOwnerDataStart());
        axios.get(`http://localhost:5000/api/v1/user/me/details`)
            .then(response => {
                let userName = response.data.userName
                console.log(response);
                dispatch(fetchOwnerDataSuccess(response, userName));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOwnerDataFail(error));
            });
    };
};