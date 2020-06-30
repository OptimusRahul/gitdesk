import React , { useState } from 'react';
import { Navbar, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Modal from '../UI/Modal/Modal';

const NavBar = (props) => {

    const [searchInput, setSearchInput] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [path, setPath] = useState('/home');
    
    const onChangeHandler = val => {
        setSearchInput(val);
        setPath('/usersList');
    }

    return (
        <>
            <Navbar bg="light" className="d-flex justify-content-between">
                <Navbar.Brand href="#home">
                    <Link to={{ pathname: '/home'}}>
                        <img 
                            src="https://img.icons8.com/bubbles/50/000000/github.png"
                            alt="Git"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        GitDesk
                    </Link>
                </Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Search User Only" onChange={e => onChangeHandler(e.target.value)} className="mr-sm-2" />
                    <Link 
                        to={{
                            pathname: path,
                            state:{ userName:`${searchInput}` } }}> Search</Link>
                </Form>
                <div style={{ display: 'flex', flexFlow: 'row' }}>
                    {/*<Button
                        variant="light"
                        title="Create Repo"
                        style={{ display: 'flex', alignSelf: 'flex-end', flexFlow: 'row', justifyContent: 'center', marginRight: '5px' }}
                        onClick={() => setModalShow(true)}>
                        <img src="https://img.icons8.com/cotton/64/000000/plus--v1.png" alt="Add" width="30px" height="30px"/>
                    </Button>*/}
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)} />
                        <NavDropdown alignRight title="Menu" id="collasible-nav-dropdown">
                        <NavDropdown.Item ><Link to={{pathname: '/newAcc'}}>Sign In With Another Account</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            {/*<NavDropdown.Item><Link to={{pathName: '/logout'}}>Logout</Link></NavDropdown.Item>*/}
                        </NavDropdown>
                </div>
            </Navbar>
        </>
    );
}

export default NavBar;