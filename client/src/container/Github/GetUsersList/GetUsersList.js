import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import UserProfiles from '../../../components/SearchUsers/UserProfile';
import NavBar from '../../../components/Navbar/Navbar';

class GetUserList extends Component {

    shouldComponentUpdate(){
        return true;
    }

    handleBack = () => {
        this.props.history.go(-1);
    }

    getPageData = (pageNo) => {
        console.log(pageNo);
        this.props.onfetchUsersList(this.props.location.state.userName, pageNo);
    }

    render(){
        let currentRenderingComponent;
        if(this.props.loading){
            currentRenderingComponent = <Spinner />;
            if(this.props.location){
                if(this.props.location.state.userName !== this.props.user)
                    this.props.onfetchUsersList(this.props.location.state.userName);
            }
        } else if(this.props.location && this.props.location.state.userName !== this.props.user){
            currentRenderingComponent = <Spinner />;
            this.props.onfetchUsersList(this.props.location.state.userName);
        } else {
            currentRenderingComponent = (
                <div>
                    <UserProfiles  
                        usersList={this.props.usersList}
                        handleBack={this.handleBack}
                        lastPageNumber={Math.ceil(this.props.total_count/30)}
                        pageType='usersList'
                        userType='searchedUser' 
                        user={this.props.user}
                        owner={this.props.owner}
                        fetchPageData={this.getPageData} />
                </div>
            );
        }

        return (
            <div>
                <NavBar />
                {currentRenderingComponent}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        owner: state.owner.userName,
        user: state.searchUser.user,
        usersList: state.searchUser.usersList,
        total_count: state.searchUser.total_count,
        loading: state.searchUser.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onfetchUsersList: (userName, page, perPage) => dispatch(actions.searchUserList( userName, page, perPage ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetUserList);