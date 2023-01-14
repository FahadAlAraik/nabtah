import React from 'react';
import { useState,useEffect } from 'react';
import { Container,Row,Col,Form,Button,Alert } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import leaf from './icons/leaf.png'
import {AiFillEdit} from 'react-icons/ai'
import {FaRegEyeSlash,FaRegEye} from 'react-icons/fa'
import axios from 'axios';
import Footer from './Footer';

function Account(props) {

    const  [type,updateType] = useState('password')
    const [showHide, updateShowHide] = useState(false)
    const [fname,updateFName] = useState('')
    const [toggleFName,updateToggleFName] = useState(true)
    const [lname,updateLName] = useState('')
    const [toggleLName,updateToggleLName] = useState(true)
    const [phoneNumber,updatePhoneNumber] = useState('')
    const [togglePhoneNumber,updateTogglePhoneNumber] = useState(true)
    const [password,updatePassword] = useState('Fahad123')
    const [togglePassword,updateTogglePassword] = useState(true)
    const [error,updateError] = useState(false)
    const [isUpdated,updateIsUpdated] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:5000/getAccount',{withCredentials:true})
        .then(resp => {
            console.log(resp.data)
            updateFName(resp.data[0].First_Name)
            updateLName(resp.data[0].Last_Name)
            updatePhoneNumber(resp.data[0].Phone_Number)
            updatePassword(resp.data[0].Password)
        })
    },[])

    function handleEdit(e) {
        e.preventDefault()
        const validPassword = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
        
        if(validPassword.test(password)) {
            console.log(phoneNumber)
            axios.post('http://localhost:5000/editAccount',{'password':password,'fname':fname,'lname':lname},{withCredentials:true})
            .then(resp => {
                if(resp.status == 200 && resp.data == 'edited') {
                    updateIsUpdated(true)
                }
            })
        }

        else
            updateError(true)
    
      
    }


    return (
            <>
                <NavigationBar />
                <Container  className='justify-content-center '>
                    
                    <Col className='text-center m-3'>
                        <img src={leaf} className='text-center' style={{height:'256px',width:'256px'}} />
                    </Col>
                    
                    <Form className='justify-content-center align-items-center align-self-center'>

                        <Form.Group className="mb-3 m-auto" style={{width:'70%',position:'relative'}}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control disabled={toggleFName} value={fname} onChange={e => updateFName(e.target.value)} type="text" name='fname' placeholder="Enter First Name" className='shadow-none'  />
                            {toggleFName? <AiFillEdit style={{fill:'#555c79'}} className='edit-icon' onClick={e => updateToggleFName(!toggleFName)} /> : <AiFillEdit  className='edit-icon' onClick={e => updateToggleFName(!toggleFName)} />}
                        </Form.Group>

                        <Form.Group className="mb-3 m-auto" style={{width:'70%',position:'relative'}}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control disabled={toggleLName} value={lname} onChange={e => updateLName(e.target.value)} type="text" name='lname' placeholder="Enter Last Name" className='shadow-none'  />
                            {toggleLName? <AiFillEdit style={{fill:'#555c79'}} className='edit-icon' onClick={e => updateToggleLName(!toggleLName)} /> : <AiFillEdit  className='edit-icon' onClick={e => updateToggleLName(!toggleLName)} />}
                        </Form.Group>

                        <Form.Group className="mb-3 m-auto" style={{width:'70%',position:'relative'}}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control disabled={togglePassword} type={type} name='password' placeholder="Password" className='shadow-none' value={password} onChange={e => updatePassword(e.target.value)} />
                            {togglePassword? <AiFillEdit style={{fill:'#555c79'}} className='edit-icon' onClick={e => updateTogglePassword(!togglePassword)} /> : <AiFillEdit  className='edit-icon' onClick={e => updateTogglePassword(!togglePassword)} />}
                            {!showHide?<FaRegEyeSlash className='hide-show-password-account' style={{fill:'#555c79'}} onClick={(e) => {updateType('text');updateShowHide(!showHide)}}/>: <FaRegEye onClick={(e) =>{updateType('password');updateShowHide(!showHide)}} className='hide-show-password-account' /> }
                            
                        </Form.Group>
                        {showHide &&  <Form.Text id="passwordHelpBlock" muted className='text-center d-block'>Minimum eight characters, at least one letter and one number:</Form.Text>}
                        <br />
                        <Button className='d-block m-auto' variant="dark" type="submit" onClick={handleEdit}>
                            Edit Account
                        </Button>
                    </Form>
                    {error &&  <Alert variant='danger'>Password is minimum eight characters, at least one letter and one number </Alert>}
                    <br />
                    {isUpdated &&  <Alert  variant='success'>Account Updated! if you want to see the result, you need to logout then login</Alert>}
                </Container>
            <Footer />
            </>
            
    );
}

export default Account;