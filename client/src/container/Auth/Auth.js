import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { updateObject } from '../../utility/utility';
import './Auth.css';

class Auth extends Component {

    handleNewWindow = () => {
        /*const electron = window.require("electron");
        const ipcRenderer  = electron.ipcRenderer;
        ipcRenderer.send('auth', 'hi');*/
        
    }

    render() {
        let title = 'SIGN IN WITH GITHUB';
        return(
            <div className="d-flex flex-col mx-auto" style={{minHeight: '200px', width: '20rem', height: '100vh'}}>
                <Card className="justify-content-center align-self-center mx-auto text-center">
                    <Card.Header>GitDesk</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome To GitDesk</Card.Title>
                        <Card.Text>
                            We provide you a new and simple way to manage your projects.
                            Just Click on the button below, to enjoy the new experience of github.
                        </Card.Text>
                        <a href='http://localhost:5000/auth/github'> SIGN IN WITH GITHUB </a>
                        <Button variant="primary" onClick={this.props.onAuth}>{title}</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Made by OptimusRahul</Card.Footer>
                </Card>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: () => dispatch(actions.auth()),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/home'))
    }
}

export default connect(null, mapDispatchToProps)(Auth);