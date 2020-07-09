import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Navbar from '../../Navbar/Navbar';
import Spinner from '../../UI/Spinner/Spinner';
import GetUser from '../GetUser/GetUser';
import GetRepo from '../GetRepository/GetRepo';

class GetSearchedUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            type: 'user',
            loading: true,
        }
    }
    loadUserProfile = () => {
        let searchSpecifiedUser = this.props.location.state.login;
        this.setState({ user: searchSpecifiedUser, laoding: false });
    }
    handleBack = () => {
        console.log('j1',this.props.history.go(-1));
    }

    render() {
        let mainComponent;
        if(this.props.location.state.login !== this.state.user && this.state.loading){
                this.loadUserProfile();
                mainComponent = <Spinner />;
        } else {
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
                    <Button onClick={this.handleBack} style={{margin: '10px', width: '100px'}}> Go Back </Button>
                {mainComponent}
            </div>
        );
    }
}

export default GetSearchedUser;