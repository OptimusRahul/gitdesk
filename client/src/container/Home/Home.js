import React, { Component } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import GetUser from '../Github/GetUser/GetUser';
import GetRepo from '..//Github/GetRepository/GetRepo';
import Navbar from '../../components/Navbar/Navbar';

import './Home.css';

class Home extends Component {

    shouldComponentUpdate() {
        return false;
    }

    handleBack = () => {
        this.props.history.go(-1);
    }

    getCreateData = (data) => {
        console.log('clicked', data)
    }

    render() {
        let mainComponent = (
                <Container fluid >
                            <Row style={{height: '100vh'}}>
                                <Col sm={4}>
                                    <GetUser search={false}/>
                                </Col>
                                <Col sm={8}>
                                    <GetRepo search={false}/>
                                </Col>
                            </Row>
                        </Container>
            );
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
        type: state.owner.userType,
    };
};

export default connect(mapStateToProps, null)(Home);