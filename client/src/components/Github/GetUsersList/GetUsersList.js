import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';
import UserProfiles from '../../SearchUsers/UserProfile';
import NavBar from '../../Navbar/Navbar';
import { getSearchedUser } from '../../../store/index';

class GetUserList extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: null,
            usersList: null,
            total_count: 1,
            loading: true
        }
    }

    shouldComponentUpdate(){
        return true;
    }

    
    handleBack = () => {
        this.props.history.go(-1);
    }

    /*getUsersList = async(page = 1) => {
        if(this.props.location && this.props.location.state && this.props.location.state.userName){
            let data = await getSearchedUser(this.props.location.state.userName, page);
            this.setUsersList(data)
        } else {
            this.handleBack();
            alert('Enter Valid UserName!!')
        }
    }*/

    /*setUsersList = (data) => {
        console.log(data);
        let users = data.data;
        let total = data.data.total_count;
        let total_count = Math.ceil(total/30);
        console.log(total_count);
        console.log(data.data);
        if(this.state.total_count === 1)
            this.setState({ user: this.props.location.state.userName, usersList: users, loading: false, total_count });
        else 
            this.setState({ user: this.props.location.state.userName, usersList: users, loading: false });
    }*/

    getPageData = (pageNo) => {
        console.log(pageNo);
        this.props.onfetchUsersList(this.props.location.state.userName, pageNo);
    }

    render(){
        let currentRenderingComponent;
        console.log('hi', this.props.location.state.userName);
        //
        if(this.props.loading){
            console.log('inside if')
            currentRenderingComponent = <Spinner />;
            if(this.props.location){
                if(this.props.location.state.userName !== this.props.user)
                    this.props.onfetchUsersList(this.props.location.state.userName);
                //if(this.props.location && this.props.location.state && this.props.location.state.userName)
            }
        } else if(this.props.location && this.props.location.state.userName !== this.props.user){
            console.log('inside else if')
            currentRenderingComponent = <Spinner />;
            this.props.onfetchUsersList(this.props.location.state.userName);
        } else {
            console.log('inside else', this.props.usersList)
            currentRenderingComponent = (
                <div>
                    <UserProfiles  
                        usersList={this.props.usersList}
                        handleBack={this.handleBack}
                        lastPageNumber={Math.ceil(this.props.total_count/30)}
                        pageType='usersList'
                        userType='searchedUser' 
                        user={this.props.user}
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
        user: state.searchUser.user,
        usersList: state.searchUser.usersList,
        total_count: state.searchUser.total_count,
        loading: state.searchUser.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onfetchUsersList: (userName, page, perPage) => dispatch(actions.searchUserList( userName, page, perPage ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetUserList);
