import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

class Auth extends Component {

    handleNewWindow = () => {
        const electron = window.require("electron");
        const ipcRenderer  = electron.ipcRenderer;
        ipcRenderer.send('auth', 'hi');
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
                        <Button variant="primary" onClick={this.handleNewWindow}>{title}</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Made by OptimusRahul</Card.Footer>
                </Card>
            </div>
        );
    }
}

export default Auth;
/*<div class="d-flex flex-row mx-auto" style="min-height: 200px; width: 19rem;">
    <div class="justify-content-center align-self-center mx-auto">
        <div>
            <div class="text-center">
                Marks Attendence
            </div>                     
            <div>
                Do Something Here
            </div>                 
        </div>             
    </div>         
</div>*/