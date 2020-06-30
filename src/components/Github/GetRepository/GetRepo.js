import React, { Component } from 'react';

import Repository from '../../Repositories/Repositories';
import Spinner from '../../UI/Spinner/Spinner';
import { getLoginUserRepo, getSearchedUserRepo, getRepoLanguages } from '../../../store/index';
import Pagination from '../../Pagination/Paginate';

class GetRepo extends Component {
    constructor(props){
        super(props);
        this.state = {
            repo: null,
            user: null,
            loading: true,
            lastPageNumber: 1,
            paginate: false,
            currentPage: 1

        };
        this.setRepoHandler = this.setRepoHandler.bind(this);
        this.setLoader = this.setLoader.bind(this);
    }

    setLoader(data, type, page){
        if(type === 'search') this.setRepoHandler(data, window.localStorage.getItem('searchedUserLoginName'));
        else this.setRepoHandler(data);
        this.setCurrentPage(page)
        this.setState({loading: true, paginate: true});
    }
    setCurrentPage = (page) => this.setState({currentPage: page})

    checkLocalStorageHandler = () => {
        console.log('chlo')
        let repo, flag = false, user;
        if(this.props.type === 'owner'){
            user = window.localStorage.getItem('loginUserName');
            if(window.localStorage.getItem('loginUserRepo'))
                repo = new Map(JSON.parse(window.localStorage.getItem('loginUserRepo')));
            console.log(repo);
            if(repo && user){
                flag = true;
            }
        } else if(this.props.userName === window.localStorage.getItem('searchedUserLoginName')){
            user = window.localStorage.getItem('searchedUserLoginName');
            console.log(user)
            console.log(window.localStorage.getItem(`searchedUserRepo${user}`))
            if(window.localStorage.getItem(`searchedUserRepo${user}`))
                repo = new Map(JSON.parse(window.localStorage.getItem(`searchedUserRepo${user}`)));
            if(repo && user){
                flag = true;
            }
        }

        console.log(user, repo)

        if(flag){
            console.log('chlo true')
            this.setState({ repo, loading: false, user});
        } else {
            console.log('chlo false')
            this.fetchRepoHandler();
        }
    }

    async fetchRepoHandler() {
        let userRepo;
        if(this.props.type === 'owner'){
            userRepo = await getLoginUserRepo();
            this.setRepoHandler(userRepo);

        } else {
            userRepo = await getSearchedUserRepo(this.props.userName, 1);
            this.setRepoHandler(userRepo, window.localStorage.getItem('searchedUserLoginName'));
        }

        console.log('asda', userRepo);
    }

    getPageNumbers(userRepo) {
        let lastPageNumber = this.state.lastPageNumber;
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

    setRepoHandler = async(userRepo, currentUser = window.localStorage.getItem('loginUserName')) => {
        let lastPageNumber = this.state.lastPageNumber
        if(!this.state.paginate)
            lastPageNumber = this.getPageNumbers(userRepo)
        let repository = new Map();
        let repoLang = new Map();
        let repositories = new Map();
        //let currentUser = window.localStorage.getItem('loginUserName');//userRepo.data[0].owner.login;
        //console.log('currentUser', currentUser);
        if(userRepo.data && Object.keys(userRepo.data).length){
            for(const property in userRepo.data){
                if(!userRepo.data[property].private){
                    let singleRepoLang = await getRepoLanguages(currentUser, userRepo.data[property].name);
                    console.log('--------------->', singleRepoLang, userRepo.data[property].name, Object.keys(singleRepoLang.data), singleRepoLang.data)
                    singleRepoLang && repoLang.set(userRepo.data[property].name, Object.keys(singleRepoLang.data));
                }
            }

            Array.from((userRepo.data), r_data => {
                let singleRepoData = {
                    name: r_data.name,
                    url: r_data.html_url,
                    clone_url: r_data.clone_url,
                    created_at: r_data.created_at,
                    updated_at: r_data.updated_at,
                    fork_url: r_data.fork_url,
                    lang: repoLang.get(r_data.name)
                };
                repository.set(r_data.name, singleRepoData);
            });

            repositories.set(currentUser, repositories);

            if(this.props.type === 'owner') {
                window.localStorage.setItem('loginUserRepo', JSON.stringify(Array.from(repository)));
            } else {
                window.localStorage.setItem(`searchedUserRepo${currentUser}`, JSON.stringify(Array.from(repository)));
            }
            if(this.state.lastPageNumber === 1)
                this.setState({ repo: repository, user: currentUser, loading: false, lastPageNumber, paginate: false});
            else 
                this.setState({ repo: repository, user: currentUser, loading: false, paginate: false});
        }
    }

    render() {
        let currentRenderingComponent;
        if(this.state.loading){
            //this.checkLocalStorageHandler();
            if(!this.state.paginate)
                this.fetchRepoHandler();
            currentRenderingComponent = <Spinner />;
        } else {
            currentRenderingComponent = (
                <div>
                    <Repository
                        userRepo={this.state.repo} 
                        type={this.props.type} />
                    <Pagination 
                        currentPage={this.state.currentPage}
                        lastPageNumber={this.state.lastPageNumber}
                        pageType='repo'
                        userType='search' 
                        user={this.state.user}
                        setRepo={this.setLoader} />
                </div>
            );
        }

        return (
            <div>
                {currentRenderingComponent}
            </div>
        );
    }
};

export default GetRepo;