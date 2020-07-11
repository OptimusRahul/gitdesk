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
        console.log('-------> USER TYPE', this.userType, this.user);
    }


    // fetchAPI = (page) => {
    //     this.setState({ currentPage: page });
    //     if(this.pageType=== 'repo'){
    //         this.fetchRepo(page);
    //     } else if(this.pageType === 'usersList'){
    //         this.fetchUsers(page);
    //     }
    // }

    // fetchRepo = async(page) => {
    //     //this.props.setLoader();
    //     if(this.userType === 'user'){            
    //         let data = await getSearchedUserRepo(window.localStorage.getItem('searchedUserLoginName'), page);
    //         console.log(data);
    //         this.props.setRepo(data, 'user', page);
    //         this.setState({ currentPage: page });   
    //     } else if(this.userType === 'owner') {
    //         let data = await getLoginUserRepo(page);
    //         this.props.setRepo(data, 'owner', page);
    //         this.setState({ currentPage: page });
    //     }
    // }

    // fetchUsers = async(page) => {
    //     let data = await getSearchedUser(this.props.user, page);
    //     this.props.setUsers(data);
    //     this.setState({ currentPage: page });
    // }

    // componentDidMount() {

    // }

    // getTotalPage() {

    // }

    // getPreviousPage() {

    // }

    // getNextPage() {

    // }

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
                <Pagination style={{ display: 'flex', justifyContent: 'center'}}>
                      {this.state.currentPage - this.ellipsisSize > 0 ? <Pagination.Ellipsis /> : null }
                        {paginationSection.map(page=><Pagination.Item 
                                                        active={this.props.currentPage === page ? true : false}
                                                        onClick={() => this.props.fetchPageData(page)}>{page}</Pagination.Item>)}
                      {this.state.currentPage + this.ellipsisSize < this.state.lastPageNumber ? <Pagination.Ellipsis /> : null}
                </Pagination>
            );
        }else {
            paginationSection = this.getPageArray(this.state.lastPageNumber).map(page=>(
                <Pagination.Item 
                    active={this.props.currentPage === page ? true : false} 
                    onClick={() => this.props.fetchPageData(page)} >
                    {page}
                </Pagination.Item>)
            )
            return (
                <Pagination style={{ display: 'flex', justifyContent: 'center'}}>
                    {paginationSection}
                </Pagination>
            );
        }
    }

}

export default Paginate;