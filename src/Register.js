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

    const [phoneNumber,updatePhoneNumber] = useState('')
    const [fname,updateFName] = useState('')
    const [lname,updateLName] = useState('')
    const [password,updatePassword] = useState('')
    const [cpassword,updateCPassword] = useState('')
    const [IsRegistered,updateRegistered] = useState(false)
    const [error,updateError] = useState('')
    const [showHide, updateShowHide] = useState(false)
    const  [type,updateType] = useState('password')
    const [phoneNumberBorder,updatePhoneNumberBorder] = useState('2px solid #555c79')
    const [passwordBorder,updatePasswordBorder] = useState('2px solid #555c79')
    const [cpasswordBorder,updateCPasswordBorder] = useState('2px solid #555c79')
    //var defaultBorder = '2px solid #555c79'
    //var errorBorder = '2px solid darkred'
    //var goodBorder = '2px solid green'



    function handleRegister(e) {
        e.preventDefault()
        if(password == cpassword && password != ''){
            const validPassword = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
            if(validPassword.test(password)) {
                const validPhone = new RegExp('^05\\d{8}$')
                if(validPhone.test(phoneNumber)) {

                    axios.post("http://localhost:5000/register",{'phone-number':phoneNumber,password,'confirm-password':cpassword,'first-name':fname,'last-name':lname},{ withCredentials: true })
                    .then((resp) => {
                        
                        if(resp.status == 200 && resp.data == 'success') {
                            updateRegistered(true)
                            setInterval(()=> window.location.href = '/login',5000)
                        }

                        else 
                            updateError('An email exists with same credintials')
                        })
                        .catch(err => updateError('Something wrong happened, it was not your fault !'))

                    updateError('')
                    updatePhoneNumberBorder('2px solid #555c79')
                    updatePasswordBorder('2px solid #555c79')
                    updateCPasswordBorder('2px solid #555c79')
            }
                else {
                    updateError('phone number must start with 05 and be 10 character long only digits')
                    updatePhoneNumberBorder('2px solid darkred')
                    updatePasswordBorder('2px solid #555c79')
                    updateCPasswordBorder('2px solid #555c79')
                }
            }

            else {
                updateError('Minimum eight characters, at least one letter and one number')
                updatePasswordBorder('2px solid darkred')
                updateCPasswordBorder('2px solid darkred')
            }
            
        }
        else {
            updatePasswordBorder('2px solid darkred')
            updateCPasswordBorder('2px solid darkred')
            updateError('Password and confirm password do not match')
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
                                    <Form.Control type="text" name="first-name"  className='shadow-none' style={{border:'2px solid #555c79'}} placeholder="First name" onChange={((e)=> updateFName(e.target.value) )}/>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingInput"  label="Last Name" className="mb-3">
                                    <Form.Control type="text" name="last-name"  className='shadow-none ' style={{border:'2px solid #555c79'}} placeholder="Last name" onChange={((e)=> updateLName(e.target.value) )}/>
                                </FloatingLabel>
                                
                                <FloatingLabel controlId="floatingInput"  label="Phone Number" className="mb-3">
                                    <Form.Control type="email" name="phone-number"   className='shadow-none ' style={{border:phoneNumberBorder}} placeholder="05********" onChange={((e)=> updatePhoneNumber(e.target.value) )}/>
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Example: 0557345192
                                    </Form.Text>
                                </FloatingLabel>
                                

                                <FloatingLabel controlId="floatingInput"  label="Password" className="mb-3">
                                    <Form.Control type={type} className='shadow-none' name="password" style={{border:passwordBorder}} placeholder="12345678" onChange={((e)=> updatePassword(e.target.value) )} />
                                    {!showHide?<FaRegEyeSlash className='hide-show-password' style={{fill:'#555c79'}} onClick={(e) => {updateType('text');updateShowHide(!showHide)}}/>: <FaRegEye onClick={(e) =>{updateType('password');updateShowHide(!showHide)}} className='hide-show-password' /> }
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Minimum eight characters, at least one letter and one number:
                                    </Form.Text>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingInput"  label="Confirm password" className="mb-3">
                                    <Form.Control type={type} name="confirm-password"  className='shadow-none ' style={{border:cpasswordBorder}} placeholder="name@example.com" onChange={((e)=> updateCPassword(e.target.value) )} />
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

            {IsRegistered && <Alert className='mt-3' variant='success'>
                Nice!, You have Successfully Registered, now please proceed to the <Link to='/login'>login page</Link>
            </Alert>}
         </Container>

       </>
        
 
 
     );
}

export default Register;