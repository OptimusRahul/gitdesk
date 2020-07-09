import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import { connect } from 'react-redux';
import GetUser from '../../components/Github/GetUser/GetUser';
import GetRepo from '../../components/Github/GetRepository/GetRepo';
import Navbar from '../../components/Navbar/Navbar';

import './Home.css';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            type: 'owner',
            user: null,
            token: false
        }
        //this.getAccessToken();
        console.log(this.props.location);
    }

    getAccessToken = () => {
        const electron = window.require("electron");
        const ipcRenderer  = electron.ipcRenderer;
        ipcRenderer.on('github-oauth-reply', (event, access_token ) => {
            console.log('hi', access_token);
            this.token=access_token;
            window.localStorage.setItem('gitHubToken', access_token);
            this.setState({ token: true });
        });
    }

    getCreateData = (data) => {
        console.log('clicked', data)
    }

    render() {
        //this.getAccessToken();
        let mainComponent;
        console.log(this.props.location);
        console.log(window.localStorage.getItem('gitHubToken'));
        if(!window.localStorage.getItem('gitHubToken') && !this.state.token){
            this.getAccessToken();
            mainComponent = <Spinner />
        } else if(this.props.location.pathname === '/searchedUser'){
            if(this.props.location.state.login !== this.state.user){
                this.loadUserProfile();
            }
        } else if(this.props.location.pathname === '/usersList'){
            mainComponent = '';
        } else {
            console.log(window.localStorage.getItem('gitHubToken'));
            mainComponent = (
                        <Container fluid >
                            <Row style={{height: '100vh'}}>
                                <Col sm={4}>
                                    <GetUser type={this.state.type} userName={this.state.user}/>
                                </Col>
                                <Col sm={8}>
                                    <GetRepo type={this.state.type} userName={this.state.user}/>
                                </Col>
                            </Row>
                        </Container>
            );
        }
        
        return(
            <div >
                <Navbar 
                    getcreatedata={this.getCreateData} />
                {mainComponent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        type: state.home.type,
        user: state.home.user,
        token: state.home.token
    };
};

/*const mapDispatchToProps = dispatch => {
    return {

    }
};*/

export default connect(null, mapStateToProps)(Home);