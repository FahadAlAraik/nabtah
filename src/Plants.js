import React from 'react';
import {RiPlantFill} from 'react-icons/ri';
import { Container } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {GiCherry,GiCorn,GiGrapes,GiChiliPepper,GiPotato,GiTomato} from 'react-icons/gi'

function Plants() {
    return (
        
        <Container id='plants' fluid className='pt-3 pb-3' style={{marginTop:'95px'}}>


            <Row>
                <Col className='text-center'>
                    <h1 className='Poppins' style={{color:'#007096'}}>Supported Plants</h1>
                </Col>
            </Row>
            <Row className='justify-content-center' style={{margin:'95px'}}>
                <Col className='text-center' md={3}>
                    <GiCherry className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Cherry</h3>
                    <small className='form-text'>Healthy, Powdery Mildew</small>
                </Col>
                <Col className='text-center' md={3}>
                    <GiCorn className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Corn</h3>
                    <small className='form-text'>Healthy, Common Rust</small>
                </Col>
                <Col className='text-center' md={3}>
                    <GiGrapes className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Grape</h3>
                    <small className='form-text'>Healthy, Esca (Black_Measles), Black Rot </small>
                </Col>
            </Row>

            <Row className='justify-content-center' style={{margin:'95px'}}>
                <Col className='text-center' md={3}>
                    <GiChiliPepper className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Pepper</h3>
                </Col>
                <Col className='text-center' md={3}>
                    <GiPotato className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Potato</h3>
                </Col>
                <Col className='text-center' md={3}>
                    <GiTomato className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Tomato</h3>
                </Col>
            </Row>


        </Container>


    );
}

export default Plants;