import axios from 'axios';
import { urlConfiguration, githubConfiguration } from '../config/config';

const baseURL = urlConfiguration.baseURL;

export const getSearchedUserList = async(req, res, next) => {
    const userName = req.query.userName;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 30;
    let apiResponse;

    const headers = {
        "headers" : {
            'Authorization' : `token ${githubConfiguration.access_token}`,
            'Content-type' : 'application/json'
        }
    };

    await axios.get(`${baseURL}/search/users?q=${userName}&page=${page}&per_page=${perPage}`, headers)
        .then(data => {
            apiResponse = data;
            //res.status(200).send(data);
            // res.status(200).send({
            //     slug: `${userName}-searched-list`,
            //     message: 'Success',
            //     data: apiResponse
            // });
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({
                slug: `${userName}: invalid user`,
                message: 'fail',
                data: error
            });
        });

        // let result;
        // if(apiResponse){
        //     result = Object.keys(apiResponse).reduce((r, k) => {
        //         return r.concat(k, apiResponse[k]);
        //     }, []);
        // }

        // console.log(result);

        let cache = [];
        let result = JSON.stringify(apiResponse, (key, value) => {
            if(typeof value === 'object' && value !== null) {
                if(cache.includes(value)) return;
                cache.push(value);
            }
            return value;
        });

        cache = null;

        res.status(200).json({
            slug: `${userName}-searched-list`,
            message: 'Success',
            data: result
        });
};