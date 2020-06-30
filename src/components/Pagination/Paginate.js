import React, { Component } from 'react';

import { Pagination } from 'react-bootstrap';
import { getLoginUserRepo, getSearchedUserRepo, getSearchedUser } from '../../store/index';

class Paginate extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: this.props.currentPage ||  1,
            itemPerPage: 30,
            lastPageNumber: this.props.lastPageNumber
        }
        this.pageType = this.props.pageType;
        this.userType = this.props.userType;
        this.user = this.props.user;
        this.ellipsisSize = 3
    }


    fetchAPI = (page) => {
        this.setState({ currentPage: page });
     
        if(this.pageType=== 'repo'){
            this.fetchRepo(page);
        } else if(this.pageType === 'usersList'){
            
            this.fetchUsers(page);
        }

    }

    fetchRepo = async(page) => {
        //this.props.setLoader();
        if(this.userType === 'search'){
            
            let data = await getSearchedUserRepo(window.localStorage.getItem('searchedUserLoginName'), page);
            this.props.setRepo(data, 'search', page);
            this.setState({ currentPage: page });   
        } else if(this.userType === 'loginUser') {

        }
    }

    fetchUsers = async(page) => {
        let data = await getSearchedUser(this.props.user, page);
        this.props.setUsers(data);
        this.setState({ currentPage: page });
    }

    componentDidMount() {

    }

    getTotalPage() {

    }

    getPreviousPage() {

    }

    getNextPage() {

    }

    getPageArray = (lastPageNumber, startingPageNumber = 1) => {
        let pageArr = [];
        for(let i = startingPageNumber; i<=lastPageNumber; i++) {
            pageArr.push(i)
        }
        return pageArr;
    }

    render(){
        let paginationSection = null;
        console.log('Current Page: ', this.state.currentPage );
        if(this.state.lastPageNumber > 3) {
            paginationSection = this.getPageArray(this.state.lastPageNumber).filter(page=>{

                let currentPageLeftMost = this.state.currentPage - this.ellipsisSize;
                let currentPageRightMost = this.state.currentPage + this.ellipsisSize;
                
                if(currentPageLeftMost<page  && currentPageRightMost >= page) {
                    return page;
                }
            })
            
            return (
                <Pagination>
                      {this.state.currentPage - this.ellipsisSize > 0 ? <Pagination.Ellipsis /> : null }
                        {paginationSection.map(page=><Pagination.Item 
                                                        active={this.state.currentPage === page ? true : false}
                                                        onClick={() => this.fetchAPI(page)}>{page}</Pagination.Item>)}
                      {this.state.currentPage + this.ellipsisSize < this.state.lastPageNumber ? <Pagination.Ellipsis /> : null}
                </Pagination>
            );
        }else {
            paginationSection = this.getPageArray(this.state.lastPageNumber).map(page=>(
                <Pagination.Item 
                    active={this.state.currentPage === page ? true : false} 
                    onClick={() => this.fetchAPI(page)} >
                    {page}
                </Pagination.Item>)
            )
            return (
                <Pagination>
                    {paginationSection}
                </Pagination>
            );
        }
    }

}

export default Paginate;