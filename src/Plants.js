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
                    <h2 className=' mt-2 plant-title'>Cherry</h2>
                </Col>
                <Col className='text-center' md={3}>
                    <GiCorn className='plant-icon m-3' />
                    <h2 className=' mt-2 plant-title'>Corn</h2>
                </Col>
                <Col className='text-center' md={3}>
                    <GiGrapes className='plant-icon m-3' />
                    <h2 className=' mt-2 plant-title'>Grape</h2>
                </Col>
            </Row>

            <Row className='justify-content-center' style={{margin:'95px'}}>
                <Col className='text-center' md={3}>
                    <GiChiliPepper className='plant-icon m-3' />
                    <h2 className=' mt-2 plant-title'>Pepper</h2>
                </Col>
                <Col className='text-center' md={3}>
                    <GiPotato className='plant-icon m-3' />
                    <h2 className=' mt-2 plant-title'>Potato</h2>
                </Col>
                <Col className='text-center' md={3}>
                    <GiTomato className='plant-icon m-3' />
                    <h2 className=' mt-2 plant-title'>Tomato</h2>
                </Col>
            </Row>


        </Container>


    );
}

export default Plants;