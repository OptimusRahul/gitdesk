import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Auth extends Component {

    handleNewWindow = () => {
        const electron = window.require("electron");
        const ipcRenderer  = electron.ipcRenderer;
        ipcRenderer.send('auth', 'hi');
    }

    render() {
        let title = 'SIGN IN WITH GITHUB';
        return(
            <div>
                <header>
                    Welcome To GitDesk
                </header>
                <section>
                    We provide you a new and simple way to manage your projects.
                    Just Click on the button below, to enjoy the new experience of github.
                </section>
                <Button onClick={this.handleNewWindow}>{title}</Button>
            </div>
        );
    }
}

export default Auth;