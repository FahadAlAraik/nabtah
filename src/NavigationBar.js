import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  NavDropdown  from 'react-bootstrap/NavDropdown';
import logo from './icons/logo.png'
import {AiOutlineUser} from 'react-icons/ai'
import {MdOutlineLanguage} from 'react-icons/md'
import { Link } from 'react-router-dom';


function NavigationBar() {

    const [user,setUser] = useState('')
    

    useEffect(() => {
        axios.post("http://localhost:5000/@logged",{},{  withCredentials: true })
        .then(resp => {
            if (resp.status == 200 && resp.data != 'UNAUTHORIZED') {
                sessionStorage.setItem('logged', true);
                setUser(resp.data)
            }
            else
            sessionStorage.removeItem('logged')
        },[])
        .catch(err => console.log)
    },[])

    if(!sessionStorage.getItem('logged'))
        return (
            <Navbar className='p-3 mt-2' expand="xl" >
            <Container fluid>
            <Navbar.Brand href="/"><img src={logo} style={{width:'200px'}}  /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
                    <Nav className=" text-capatalize " style={{marginLeft:'50px'}}>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#objectives">Objectives</Nav.Link>
                    <Nav.Link href="#plants">Plants</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
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
            <Navbar className='p-3 mt-2' expand="xl" >
            <Container fluid>
            <Navbar.Brand href="/"><img src={logo} style={{width:'200px'}} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
                    <Nav className=" text-capatalize">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/#objectives">Objectives</Nav.Link>
                    <Nav.Link href="/#plants">Plants</Nav.Link>
                    <Nav.Link href="/#about">About</Nav.Link>
            </Nav>
            <Nav>
                <NavDropdown title={`Signed in as ${user}`} id="basic-nav-dropdown" style={{fontSize:'0.75em',marginTop:'10px'}}>
                    <NavDropdown.Item style={{fontsize:'0.75em'}} href="#action/3.1">Account</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.1">History</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => {axios.post("http://localhost:5000/logout",{},{withCredentials:true}).then(resp => {sessionStorage.removeItem("logged");window.location.href = '/'})}}>Logout</NavDropdown.Item>
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