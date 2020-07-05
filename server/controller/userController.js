import axios from 'axios';
import { baseURL } from '../utility/config';
import catchAsync from '../utility/catchAsync';
import { response } from 'express';

const headers = {
    "headers" : {
        'Authorization' : `token 123`,
        'Content-type' : 'application/json'
    }
};

export const getAuthenticatedUserData = catchAsync(async(token) => {
    return await axios.get(`${baseURL}/user`,  headers)
        .then(res => {
            return response.status(200).json({
                slug: 'auth-user-profile',
                message: res
            });
        })
        .catch(err => {
            return response.status(404).json({
                slug: 'fail',
                message: err
            })
        });
});

export const getAuthenticatedUserRepo = catchAsync(async(token, page = 1, per_page = 10) => {
    return await axios.get(`${baseURL}/user/repos?page=${page}&per_page=${per_page}&${secret}`, headers)
        .then(res => {
            return response.status(200).json({
                slug: `auth-user-repo-page-${page}/${per_page}`,
                message: res
            });
        })
        .catch(err => {
            return response.status(404).json({ 
                slug: 'fail',
                message: err
            });
        });
});

export const postAuthenticatedUserCreateRepo = catchAsync(async(token, data) => {
    return await axios.post(`${baseURL}/user/create`, headers, ...data)
        .then(res => {
            return response.status(200).json({
                slug: 'create-success',
                message: res
            });
        })
        .catch(err => {
            return response.status(404).json({
                slug: 'fail',
                message: err
            });
        });
});

export const deleteAuthenticatedUserRepo = catchAsync(async(token, data) => {
    return await axios.delete(`${baseURL}/user/delete`, headers, ...data)
        .then(res => {
            return response.status(200).json({
                slug: 'delete-success',
                message: res
            });
        })
        .catch(err => {
            return response.status(404).json({
                slug: 'fail',
                message: err
            });
        });
});