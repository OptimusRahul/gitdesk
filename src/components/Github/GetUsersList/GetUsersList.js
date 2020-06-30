import React, { Component } from 'react';

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
    
    handleBack = () => {
        this.props.history.go(-1);
    }

    getUsersList = async(page = 1) => {
        if(this.props.location && this.props.location.state && this.props.location.state.userName){
            let data = await getSearchedUser(this.props.location.state.userName, page);
            this.setUsersList(data)
        } else {
            this.handleBack();
            alert('Enter Valid UserName!!')
        }
    }

    setUsersList = (data) => {
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
    }

    render(){
        let currentRenderingComponent;
        console.log('hi', this.props.location.state.userName);
        if(this.state.loading && this.props.location.state.userName !== this.state.userName){
            currentRenderingComponent = <Spinner />;
            this.getUsersList();
        } else {
            currentRenderingComponent = (
                <div>
                    <UserProfiles  
                        usersList={this.state.usersList}
                        handleBack={this.handleBack}
                        lastPageNumber={this.state.total_count}
                        pageType='usersList'
                        userType='searchedUser' 
                        user={this.state.user}
                        setUsers={this.setUsersList} />
                    
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

export default GetUserList;
