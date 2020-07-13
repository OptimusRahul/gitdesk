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
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)} />
                        <NavDropdown alignRight title="Menu" id="collasible-nav-dropdown">
                        <NavDropdown.Item ><Link to={{pathname: '/newAcc'}}>Sign In With Another Account</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                </div>
            </Navbar>
        </>
    );
}

export default NavBar;