import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import plantRegister from './icons/plant.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import {FaRegEyeSlash} from 'react-icons/fa'
import {FaRegEye} from 'react-icons/fa'

function Register() {

    const [email,updateEmail] = useState('')
    const [password,updatePassword] = useState('')
    const [cpassword,updateCPassword] = useState('')
    const [IsRegistered,updateRegistered] = useState(false)
    const [error,updateError] = useState('')
    const [showHide, updateShowHide] = useState(false)
    const  [type,updateType] = useState('password')



    function handleRegister(e) {
        e.preventDefault()
        if(password == cpassword && password != ''){
            axios.post("http://localhost:5000/register",{email,password,'confirm-password':cpassword},{ withCredentials: true })
                            .then((resp) => {
                                if(resp.status == 200 && resp.data == 'success') {
                                    updateRegistered(true)
                                    setInterval(()=> window.location.href = '/login',5000)
                                }

                                else 
                                    updateError('An email exists with same credintials')
                                
                                
                            }).catch(err => updateError('Something wrong happened, it was not your fault !'))
                        }
        
        else {
            updateError('Password and Confirmed Password Does Not Match')
        }



    }


    return (
       <>
       <NavigationBar />

 
         <Container style={{marginTop:'75px'}}>
 
        
            <Row className='justify-content-center'>
                <Col className='align-items-center align-self-center'>
                    <h1 className='Poppins text-left'>Register</h1>
                            <Form className='mt-5'>

                            <FloatingLabel controlId="floatingInput"  label="First Name" className="mb-3">
                                    <Form.Control type="text" name="first-name"  className='shadow-none ' placeholder="First name" onChange={((e)=> updateEmail(e.target.value) )}/>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingInput"  label="Last Name" className="mb-3">
                                    <Form.Control type="text" name="last-name"  className='shadow-none ' placeholder="Last name" onChange={((e)=> updateEmail(e.target.value) )}/>
                                </FloatingLabel>
                                
                                <FloatingLabel controlId="floatingInput"  label="Email address or phone number" className="mb-3">
                                    <Form.Control type="email" name="email"  className='shadow-none ' placeholder="name@example.com" onChange={((e)=> updateEmail(e.target.value) )}/>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingInput"  label="Password" className="mb-3">
                                    <Form.Control type={type} className='shadow-none' name="password" placeholder="12345678" onChange={((e)=> updatePassword(e.target.value) )} />
                                    {!showHide?<FaRegEyeSlash className='hide-show-password' style={{fill:'#555c79'}} onClick={(e) => {updateType('text');updateShowHide(!showHide)}}/>: <FaRegEye onClick={(e) =>{updateType('password');updateShowHide(!showHide)}} className='hide-show-password' /> }
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingInput"  label="Confirm password" className="mb-3">
                                    <Form.Control type={type} name="confirm-password"  className='shadow-none ' placeholder="name@example.com" onChange={((e)=> updateCPassword(e.target.value) )} />
                                    {!showHide?<FaRegEyeSlash className='hide-show-password' style={{fill:'#555c79'}} onClick={(e) => {updateType('text');updateShowHide(!showHide)}}/>: <FaRegEye onClick={(e) =>{updateType('password');updateShowHide(!showHide)}} className='hide-show-password' /> }
                                </FloatingLabel>

                                <Button variant="dark" type="submit" onClick={handleRegister}>
                                Register
                                </Button>
                        </Form>
                       
                </Col>
                <Col className='text-end align-items-center align-self-center'>
                    <img src={plantRegister} style={{width:'400px',height:'400px'}} />
                </Col>
            </Row>
            <br />
            {error && <Alert variant='danger'>
                {error}
            </Alert>}

            {IsRegistered && <Alert className='mt-3' variant='primary'>
                Nice!, You have Successfully Registered, now please proceed to the <Link to='/login'>login page</Link>
            </Alert>}
         </Container>

       </>
        
 
 
     );
}

export default Register;