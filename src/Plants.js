import React from 'react';
import {RiPlantFill} from 'react-icons/ri';
import { Container } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {GiCherry,GiCorn,GiGrapes,GiBellPepper,GiPotato,GiTomato} from 'react-icons/gi'

function Plants() {
    return (
        
        <Container id='plants' fluid className='pt-3 pb-3' style={{marginTop:'95px'}}>


            <Row>
                <Col className='text-center'>
                    <h1 className='Poppins' style={{color:'#007096',fontWeight:'bolder'}} data-aos="fade-down"  data-aos-duration='2000'>Supported Plants</h1>
                </Col>
            </Row>
            <Row className='justify-content-center' style={{margin:'95px'}}>
                <Col className='text-center m-2' md={3} data-aos="fade-in"  data-aos-duration='2000'>
                    <GiCherry className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Cherry</h3>
                    <small className='form-text diseases'>Healthy, Powdery Mildew</small>
                </Col>
                <Col className='text-center m-2' md={3} data-aos="fade-in"  data-aos-duration='2000'>
                    <GiCorn className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Corn</h3>
                    <small className='form-text diseases'>Healthy, Common Rust</small>
                </Col>
                <Col className='text-center m-2' md={3} data-aos="fade-in"  data-aos-duration='2000'>
                    <GiGrapes className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Grape</h3>
                    <small className='form-text diseases'>Healthy, Esca (Black_Measles), Black Rot </small>
                </Col>
            </Row>

            <Row className='justify-content-center' style={{margin:'95px'}}>
                <Col className='text-center m-2' md={3} data-aos="fade-in"  data-aos-duration='3000'>
                    <GiBellPepper className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Pepper Bell</h3>
                    <small className='form-text diseases'>Healthy, Bacterial Spot</small>
                </Col>
                <Col className='text-center m-2' md={3} data-aos="fade-in"  data-aos-duration='3000'>
                    <GiPotato className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Potato</h3>
                    <small className='form-text diseases'>Healthy, Early Blight, Late Blight  </small>
                </Col>
                <Col className='text-center m-2' md={3} data-aos="fade-in"  data-aos-duration='3000'>
                    <GiTomato className='plant-icon m-3' />
                    <h3 className='Poppins mt-2 plant-title'>Tomato</h3>
                    <small className='form-text diseases'>Healthy, Target Spot, Mosiac Virus, Bacterial Spot, Late Blight </small>
                </Col>
            </Row>


        </Container>


    );
}

export default Plants;