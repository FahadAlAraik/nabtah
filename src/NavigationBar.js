import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  NavDropdown  from 'react-bootstrap/NavDropdown';
import logo from './icons/logo-eng.png'
import {AiOutlineUser} from 'react-icons/ai'
import {MdOutlineLanguage} from 'react-icons/md'
import { Link } from 'react-router-dom';


function NavigationBar() {

    const [user,setUser] = useState(sessionStorage.getItem('name'))

    useEffect(() => {
        setUser(sessionStorage.getItem('name'))
        axios.get('http://localhost:5000/getCookie',{withCredentials:true})
        .then(resp => console.log(resp))
    },[])
    

    

    if(!sessionStorage.getItem('logged'))
        return (
            <Navbar className=' p-1' expand="xl" >
            <Container fluid>
            <Navbar.Brand href="/" ><img src={logo} className='logo-image'   /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
                    <Nav className=" text-capatalize ">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/docs">Documentation</Nav.Link>
            </Nav>
            <Nav>
                    <Nav.Link href="/login">
                        <AiOutlineUser />
                    </Nav.Link>
                    <Nav.Link>
                        <MdOutlineLanguage  />
                    </Nav.Link>
                    
            </Nav>
            </Navbar.Collapse>
            
            </Container>
        </Navbar>
        );

    else {
        return (
            <Navbar className='p-1' expand="xl" >
            <Container fluid>
            <Navbar.Brand href="/"><img src={logo}  className='logo-image'/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
                    <Nav className=" text-capatalize">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/docs">Documentation</Nav.Link>
            </Nav>
            <Nav>
                <NavDropdown title={`Signed in as ${user}`} id="basic-nav-dropdown" style={{fontSize:'0.75em',marginTop:'10px'}}>
                    <NavDropdown.Item style={{fontsize:'0.75em'}} href="/account">Account</NavDropdown.Item>
                    <NavDropdown.Item href="/history">History</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => {axios.post("http://localhost:5000/logout",{},{withCredentials:true}).then(resp => {sessionStorage.removeItem("logged");sessionStorage.removeItem("name");window.location.href = '/'})}}>Logout</NavDropdown.Item>
                </NavDropdown>
                    <Nav.Link>
                        <MdOutlineLanguage  />
                    </Nav.Link> 
            </Nav>
            </Navbar.Collapse>
            
            </Container>
        </Navbar>
        )
    }

}

export default NavigationBar;