import axios from 'axios';
import { urlConfiguration, githubConfiguration, userConfiguration } from '../config/config';
import catchAsync from '../utility/catchAsync';

const baseURL = urlConfiguration.baseURL;

export const getAuthenticatedUserRepo = async(req, res, next) => {
    const pageNo = req.query.page;
    const perPage = req.query.per_page;
    let userName = req.query.userName;
    const lastPageNumber = req.query.lastPageNumber;
    const paginate = req.query.paginate;
    console.log(userName, paginate);
    let apiResponse;
    const headers = {
        "headers" : {
            'Authorization' : `token ${githubConfiguration.access_token}`,
            'Content-type' : 'application/json'
        }
    };
    await axios.get(`${baseURL}/user/repos?page=${pageNo}&per_page=${perPage}`, headers)
        .then(data => {
            //console.log(data.data);
            apiResponse = data;
            /*let repositories = new Map();
            repositories =  modifyRepositoryData(userName, data);
            res.status(200).json({
                slug: `${userName}-Repositories`,
                message: 'Success',
                data: repositories
            });*/
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ 
                slug: 'fail',
                message: err
            });
        });

        apiResponse.data.forEach(item => {
            if(!item.owner) {
                userName = item.owner.login;
                return;
            }
        })  

        let { totalPageNumber, jsonResponse } = await getRepository(apiResponse, lastPageNumber, userName, paginate)

        //console.log(jsonResponse);
        res.status(200).json({
            slug: `${userName}-Repositories`,
            message: 'Success',
            data: jsonResponse,
            lastPageNumber: totalPageNumber
        });
};

export const getSearchedUserRepo = async(req, res, next) => {
    const pageNo = req.query.page;
    const perPage = req.query.per_page;
    let userName = req.query.userName;
    const lastPageNumber = req.query.lastPageNumber;
    const paginate = req.query.paginate;
    console.log(userName, paginate);

    let apiResponse;

    const headers = {
        "headers" : {
            'Authorization' : `token ${githubConfiguration.access_token}`,
            'Content-type' : 'application/json'
        }
    };
    await axios.get(`${baseURL}/users/${userName}/repos?page=${pageNo}&per_page=${perPage}`, headers)
        .then(data => {
            apiResponse = data;
        })
        .catch(err => {
            res.status(404).json({ 
                slug: 'fail',
                message: err
            });
        })

    let { totalPageNumber, jsonResponse } = await getRepository(apiResponse, lastPageNumber, userName, paginate);

    //console.log(jsonResponse);
    res.status(200).json({
        slug: `${userName}-Repositories`,
        message: 'Success',
        data: jsonResponse,
        lastPageNumber: totalPageNumber
    });
};


const getPageNumbers = (userRepo, lastPageNumber) => {
    if(userRepo.headers && userRepo.headers.link){
        let link = userRepo.headers.link;
        if(link){
            link = link.replace(/<|>/g, '');
            let [nextLinkString, lastLinkString] = link.split(',');
            let url = new URL(lastLinkString);
            lastPageNumber = url.searchParams.get('page');
        }
        return lastPageNumber;
    }else {
        return lastPageNumber;
    }
}

const getRepository = async(apiResponse, lastPageNumber, userName, paginate) => {
    let repositories = new Map();
    let totalPageNumber = lastPageNumber
    if(paginate === 'false') totalPageNumber = getPageNumbers(apiResponse, lastPageNumber);
    
    let modifiedData = await modifyRepositoryData(userName, apiResponse);
    //repositories.set(userName, modifiedData.get(userName));
    let jsonResponse = {};
    for(let [key,val] of modifiedData.get(userName)){
        //console.log(key, val);
        jsonResponse[key]= val;
    }

    return { totalPageNumber, jsonResponse } ;
}

const modifyRepositoryData = async(userName, userRepo) => { 

    let repository = new Map();
    let repositoryLanguage = new Map();
    let repositories = new Map();

    if(userName && Object.keys(userRepo.data).length) {
        for(const property in userRepo.data) {
            if(!userRepo.data[property].private) {
                let currentRepoURL = userRepo.data[property].name;
                let currentRepo = await getRepoLanguages(userName, currentRepoURL);
                currentRepo && repositoryLanguage.set(currentRepoURL, Object.keys(currentRepo.data));                
            }
        }
    }

    // console.log(repositoryLanguage);

    Array.from((userRepo.data), r_data => {
        //console.log(r_data);
        let singleRepoData = {
            name: r_data.name,
            url: r_data.html_url,
            clone_url: r_data.clone_url,
            created_at: r_data.created_at,
            updated_at: r_data.updated_at,
            fork_url: r_data.forks_url,
            lang: repositoryLanguage.get(r_data.name)
        };

        repository.set(r_data.name, singleRepoData);
    });

    repositories.set(userName, repository);

    // console.log(repositories);
    
    return repositories;
}

const getRepoLanguages = async(user, repoName) => {
    const headers = {
        "headers" : {
            'Authorization' : `token ${githubConfiguration.access_token}`,
            'Content-type' : 'application/json'
        }
    };
    return await axios.get(`${baseURL}/repos/${user}/${repoName}/languages`, headers)
        .then(response => {
            return response;
        })
        .catch(err => {
            return err;
        })
};