import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Profile from '../../Profile/Profile';
import Spinner from '../../UI/Spinner/Spinner';
// import { getLoginUser, getSearchedUserData } from '../../../store/index';

class GetUser extends Component{
    /*constructor(props){
        super(props);
        /*this.state = {
            loading: true
        }*/
    // }

    shouldComponentUpdate(){
        return true;
    }

    /*componentDidMount(){
        if(!this.props.loading){
            this.setState({ loading: false });
        }
    }*/

    /*checkLocalStorageHandler = () => {
        let user, currentUser;
        let flag = false;
        if(this.props.type === 'owner'){
            user = new Map(JSON.parse(window.localStorage.getItem('loginUser')));
            currentUser = window.localStorage.getItem('loginUserName');
            console.log(user);
            if(currentUser && user){
                flag = false;
            }
        } else if(this.props.type === 'user') {
            user = new Map(JSON.parse(window.localStorage.getItem('searchedUser')));
            currentUser = window.localStorage.getItem('searchedUserName');
            console.log(user);
            if(user && currentUser){
                flag = true;
            }
        }

        if(flag){
            this.setState({ user, userName: currentUser, loading: false });
        } else{
            this.getUserData();
        }
    }*/

    /*async getUserData(){

        let userData;
        if(this.props.type === 'owner'){
            userData = await getLoginUser();
        } else {
            userData = await getSearchedUserData(this.props.userName);
        }
        console.log(userData);
        let userDetails = new Map();
        let owner;
        let currentUser;
        
        let user = {
            name: userData.data && userData.data.name || '',
            login: userData.data && userData.data.login || '',
            avatar_url: userData.data && userData.data.avatar_url || '',
            bio: userData.data && userData.data.bio || '',
            created_at: userData.data && userData.data.created_at || '',
            email: userData.data && userData.data.email || '',
            blog: userData.data && userData.data.blog || '',
            location: userData.data && userData.data.location || '',
            url: userData.data && userData.data.url || ''
        };

        if(this.props.type === 'owner') owner = user.name;
        else currentUser = user.name;

        userDetails.set(user.name, user);
        console.log(userDetails);
        if(this.props.type === 'owner') {
            window.localStorage.setItem('owner', owner);
            window.localStorage.setItem('loginUserName', user.login);
            window.localStorage.setItem('loginUserData', JSON.stringify(Array.from(userDetails)));
        } else {
            window.localStorage.setItem('searchedUserLoginName', user.login);
            window.localStorage.setItem('searchedUserName', user.name);
            window.localStorage.setItem('searchedUserData', JSON.stringify(Array.from(userDetails)));
        }
        console.log(owner)
        if(this.props.type === 'owner')
            this.setState({ user: userDetails, userName: owner, loading: false })
        else 
            this.setState({ user: userDetails, userName: currentUser, loading: false});
    }*/
    
    render() {
        let currentRendererComponent;
        console.log(this.props.loading);
        if(this.props.loading && this.props.user === null){
            console.log('inside-----------')
            currentRendererComponent = <Spinner />;
            this.props.onUserData();
        } else {
            currentRendererComponent = <Profile 
                                            user={this.props.user.data.data} 
                                            owner={this.props.userName}
                                            type={this.props.type} />
        }
        return (
            <div>
                {currentRendererComponent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        type: state.owner.userType,
        user: state.owner.user,
        userName: state.owner.userName,
        loading: state.owner.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserData: () => dispatch(actions.fetchOwnerData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetUser);
