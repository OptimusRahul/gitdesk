import React, { useState } from 'react';

import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModalForm = props => {

    const [repoName, setRepoName] = useState(' ');
    const [repoDescription, setRepoDescription] = useState(' ');
    const [repoType, setRepoType ] = useState('false');

    const onRepoNameChangeHandler = val => {
        setRepoName(val);
    }

    const onRepoDescriptionChangeHandler = val => {
        setRepoDescription(val);
    }

    const onRepoTypeChangeHandler = val => {
        setRepoType('true');
    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >

            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Create Repository
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Enter Data</h4>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={4}>
                            Repository Name :
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Repo Name" 
                                onChange={e => onRepoNameChangeHandler(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={4}>
                            Despcription(Optional): 
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                                type="text" 
                                placeholder="Description"
                                onChange={e => onRepoDescriptionChangeHandler(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <fieldset>
                        <Form.Group as={Row}>
                            <Form.Label as="legend" column sm={4}>
                                Radios
                            </Form.Label>
                            <Col sm={6}>
                                <Form.Check
                                    defaultChecked
                                    type="radio"
                                    label="public "
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                    value="public"
                                    onChange={e => onRepoTypeChangeHandler(e.target.value)}
                                    />
                                <Form.Check
                                    type="radio"
                                    label="private"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                    value="private"
                                    onChange={e => onRepoTypeChangeHandler(e.target.value)}
                                    />
                            </Col>
                        </Form.Group>
                    </fieldset>
                </Form>
            </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
        <Link to={{
            pathname: '/createRepo',
            state: {
                data: {
                    "name": `${repoName}`,
                    "description":`${repoDescription}`,
                    "auto_init": true,
                    "private": false
                }
            }
        }}> Submit </Link>
        <Button onClick={()=>props.getcreatedata({data:{ name: { repoName }, desc: { repoDescription }, type: { repoType }}})}>Submit</Button>
        </Modal.Footer>
        
      </Modal>
    );
};

export default ModalForm;