import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actions from '../../../store/actions/index';
import Repository from '../../../components/Repositories/Repositories';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Pagination from '../../../components/Pagination/Paginate';

class GetRepo extends Component {

    shouldComponentUpdate(){
        return true;
    }

    getPageData = (pageNumber) => {
        this.props.search ?
        this.props.searchUserfetchRepo(this.props.lastPageNumber, this.props.searchName, this.props.paginate, pageNumber) : 
        this.props.authUserfetchRepo(this.props.lastPageNumber, this.props.user, this.props.paginate, pageNumber)
    }

    render() {  
        let currentRenderingComponent;
        if(this.props.search && this.props.user !== this.props.searchName ) {
            currentRenderingComponent = <Spinner />;
            this.props.searchUserfetchRepo(this.props.lastPageNumber, this.props.searchName, this.props.paginate)
        } else if(!this.props.search && this.props.userType !== 'owner'){
            currentRenderingComponent = <Spinner />
            this.props.authUserfetchRepo(this.props.lastPageNumber, this.props.user, this.props.paginate);
        }else if(this.props.loading){
            if(!this.props.paginate){
                console.log(this.props.user);
                this.props.user && this.props.authUserfetchRepo(this.props.lastPageNumber, this.props.user, this.props.paginate);
            }
            currentRenderingComponent = <Spinner />;
        } else {
            currentRenderingComponent = (
                <div>
                    <Repository
                        userRepo={this.props.repo} 
                        type={this.props.type} />
                    <Pagination 
                        paginate={this.props.paginate}
                        currentPage={this.props.currentPage}
                        lastPageNumber={this.props.lastPageNumber}
                        pageType='repo'
                        userType={this.props.type} 
                        user={this.props.user}
                        fetchPageData={this.getPageData} />
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

const mapStateToProps = state => {
    return {
        repo: state.ownerRepo.repo,
        user: state.owner.userName,
        loading: state.ownerRepo.loading,
        lastPageNumber: state.ownerRepo.lastPageNumber,
        paginate: state.ownerRepo.paginate,
        currentPage: state.ownerRepo.currentPage,
        userType: state.ownerRepo.userType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authUserfetchRepo: (lastPageNumber, user, paginate, page, per_page) => dispatch(actions.fetchAuthenticatedUserRepo(lastPageNumber, user, paginate, page, per_page)),
        searchUserfetchRepo: (lastPageNumber, user, paginate, page, per_page) => dispatch(actions.fetchSearchedUserRepo(lastPageNumber, user, paginate, page, per_page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetRepo);