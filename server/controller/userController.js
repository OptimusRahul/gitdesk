import axios from 'axios';
import { urlConfiguration, githubConfiguration, userConfiguration } from '../config/config';
import catchAsync from '../utility/catchAsync';

const baseURL = urlConfiguration.baseURL;

export const getAuthenticatedUserData = async(req, res, next) => {
    console.log('Inside Auth USer');
    const headers = {
        "headers" : {
            'Authorization' : `token ${githubConfiguration.access_token}`,
            'Content-type' : 'application/json'
        }
    };
    await axios.get(`${baseURL}/user`, headers)
        .then(data => {
            userConfiguration.userName = data.data.login;
            res.status(200).json({
                userName: data.data.login,
                slug: 'auth-user-profile',
                message: 'Success',
                data: data.data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                slug: 'fail',
                message: err
            })
        });
};

export const getSearchedUserData = async(req, res, next) => {
    const userName = req.query.userName;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 30;
    console.log(userName);
    const headers = {
        "headers" : {
            'Authorization' : `token ${githubConfiguration.access_token}`,
            'Content-type' : 'application/json'
        }
    };

    await axios.get(`${baseURL}/users/${userName}`, headers)
        .then(data => {
            // console.log(data);
            userConfiguration.userName = data.data.login;
            res.status(200).json({
                userName: data.data.login,
                slug: 'search-user-profile',
                message: 'Success',
                data: data.data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                slug: 'fail',
                message: err
            })
        });
};

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