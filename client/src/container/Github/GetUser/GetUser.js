import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Profile from '../../../components/Profile/Profile';
import Spinner from '../../../components/UI/Spinner/Spinner';

class GetUser extends Component{
    
    shouldComponentUpdate(){
        return true;
    }
    
    render() {
        let currentRendererComponent;
        if(this.props.search && this.props.userName !== this.props.searchName) {
            this.props.onSearchUserData(this.props.searchName)      
            currentRendererComponent = <Spinner />
        }else if(this.props.loading && this.props.user === null){
            currentRendererComponent = <Spinner />;
            this.props.onAuthenticatedUserData();
        } else if(!this.props.search && this.props.type !== 'owner') {
            currentRendererComponent = <Spinner />;
            this.props.onAuthenticatedUserData();
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
        onAuthenticatedUserData: () => dispatch(actions.fetchAuthenticatedUserData()),
        onSearchUserData: (userName) => dispatch(actions.fetchSearchedUserData(userName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetUser);