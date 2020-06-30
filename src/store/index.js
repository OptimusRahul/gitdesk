import axios from 'axios';
require('dotenv').config();
const baseURL = 'https://api.github.com';

let obj = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET
};

let secret = `client_id=${obj.client_id}&client_secret=${obj.client_secret}`;

export const getLoginUser = async() => {
    const headers = {
        "headers":{
            "Authorization":  `token ${window.localStorage.getItem('gitHubToken')}`,
            "Content-type": "application/json"
        }
    };
    console.log('header: ', headers);
    return await axios.get(`${baseURL}/user?${secret}`, headers)
        .then(response => {
            return response;
        })
        .catch(err => {
            return err;
        });
};

export const getLoginUserRepo = async(page = 1, per_page = 10) => {
    const headers = {
        "headers":{
            "Authorization":  `token ${window.localStorage.getItem('gitHubToken')}`,
            "Content-type": "application/json"
        }
    };
    return await axios.get(`${baseURL}/user/repos?page=${page}&per_page=${per_page}&${secret}`, headers)
        .then(response => {
            return response;
        })
        .catch(err => {
            return err;
        });
};

export const getRepoLanguages = async(user, repoName) => {
    const headers = {
        "headers":{
            "Authorization":  `token ${window.localStorage.getItem('gitHubToken')}`,
            "Content-type": "application/json"
        }
    };
    return await axios.get(`${baseURL}/repos/${user}/${repoName}/languages?${secret}`)
        .then(response => {
            return response;
        })
        .catch(err => {
            return err;
        })
};

export const createRepository = async(data) => {
    const headers = {
        "headers":{
            "Authorization":  `token ${window.localStorage.getItem('gitHubToken')}`,
            "Content-type": "application/json"
        }
    };
    axios.post(`${baseURL}/user/repos`, data, {
            "headers":{
                "Authorization":  `Bearer ${window.localStorage.getItem('gitHubToken')}`,
                "Content-type": "application/json"
            }
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
};

export const getSearchedUser = async(userName = '', page = 1, per_page = 30) => {
    const headers = {
        "headers":{
            "Authorization":  `token ${window.localStorage.getItem('gitHubToken')}`,
            "Content-type": "application/json"
        }
    };
    return axios.get(`${baseURL}/search/users?q=${userName}&page=${page}&per_page=${per_page}&${secret}`)
        .then(response => {

            return response;
        })
        .catch(err => {
            return err;
        })
};

export const getSearchedUserData = async(userName, page = 1, perPage=30) => {
    const headers = {
        "headers":{
            "Authorization":  `token ${window.localStorage.getItem('gitHubToken')}`,
            "Content-type": "application/json"
        }
    };
    return await axios.get(`${baseURL}/users/${userName}?page=${page}&per_page=${perPage}&{secret}`)
        .then(response => {
            return response;
        })
        .catch(err => {
            return err;
        })
};

export const getSearchedUserRepo = async(user, page, perPage=5) => {
    const headers = {
        "headers":{
            "Authorization":  `token ${window.localStorage.getItem('gitHubToken')}`,
            "Content-type": "application/json"
        }
    };
    return await axios.get(`${baseURL}/users/${user}/repos?page=${page}&per_page=${perPage}&${secret}`)
        .then(response => {
            return response;
        })
        .catch(err => {
            return err;
        })
};