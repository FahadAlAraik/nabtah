import React from 'react';
import { Container } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {GiBullseye} from 'react-icons/gi';
import {FaThumbsUp} from 'react-icons/fa';
import {BsEmojiSmileFill} from 'react-icons/bs'

function Objectives(props) {
    return (
        <Container fluid style={{background:'#E2ECF0',marginTop:'125px',paddingBottom:'85px',paddingTop:'50px'}} id='objectives'>
            <Row className='text-center justify-content-center Poppins pt-5 pb-4'>
                <h1 style={{color:'#007096'}}><strong>Objectives</strong></h1>
            </Row>
            <Row className='justify-content-center text-center pb-3'>
                <Col className='mt-5 pt-3'>
                    <GiBullseye style={{width:'176px',height:'176px',fill:'rgb(0, 112, 150)',marginBottom:'20px'}}/>
                    <h3 style={{marginLeft:'50px',color:'rgb(0, 112, 150)',marginTop:'27px',fontFamily:'Poppins'}}><strong>Accuracy</strong></h3>
                </Col>
                <Col className='mt-5 pt-3'>
                    <FaThumbsUp style={{width:'136px',height:'162px',fill:'rgb(0, 112, 150)',marginTop:'9px'}}/>
                    <h3 style={{color:'rgb(0, 112, 150)',marginTop:'55px',fontFamily:'Poppins'}}><strong>Reliability</strong></h3>
                </Col>
                <Col className='mt-5 pt-3 text-center'>
                    <BsEmojiSmileFill style={{width:'150px',height:'150px',fill:'rgb(0, 112, 150)',marginTop:'24px'}}/>
                    <h3 style={{color:'rgb(0, 112, 150)',marginTop:'53px',fontFamily:'Poppins'}}><strong>Usability</strong></h3>
                </Col>
            </Row>
        </Container>
    );
}

export default Objectives;