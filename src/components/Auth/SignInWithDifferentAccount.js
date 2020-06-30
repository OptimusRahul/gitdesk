import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';

class Logout extends Component {

    constructor(props){
        super(props);
        this.state = {
            logout: false
        }
    }

    recieveSignInWithDiffAccEvent = () => {
        const electron = window.require("electron");
        const ipcRenderer = electron.ipcRenderer;
        ipcRenderer.on('sign-with-different-account-reply', (event, response) => {        
            this.setState({ logout: true });
        });
    }

    sendSignInWithDiffAccEvent = () => {
        const electron = window.require("electron");
        const ipcRenderer = electron.ipcRenderer;
        ipcRenderer.send('sign-with-different-account', 'hi');
        this.recieveSignInWithDiffAccEvent();
    }

    render(){
        if(!this.state.logout){
            this.sendSignInWithDiffAccEvent();
            return (<Spinner />);
        } else {
            return (<Redirect to={{pathname: '/auth' }} />);
        }
        
    }
}

export default Logout;