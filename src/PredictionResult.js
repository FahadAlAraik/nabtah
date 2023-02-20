import React from 'react';
import NavigationBar from './NavigationBar';
import { Container,Row,Col } from 'react-bootstrap';
import plantName from './icons/terpene.png';
import accuracy  from './icons/accuracy.png';
import disease from './icons/disease.png';
import { Form } from 'react-bootstrap';
import cherryHealthy from './icons/cherry-healthy.JPG';
import {IoIosArrowBack} from 'react-icons/io'
function PredictionResult(props) {


    const probColor = () => {
        
        if(props.probability >= 75) {
            return '#00AF46'
        }

        else if (props.probability >= 50) {
            return '#FF851B'
        }

        else {
            return 'darkred'
        }


    }


    return (
        <Container  className='container-result'>
          
          
                <Row>
               
                    <Col className=''>
                   
                        <h1 className='text-center Poppins p-3' style={{position:'relative'}}><IoIosArrowBack className='back-icon' onClick={() => window.location.href='/image'} style={{position:'absolute',left:'0%',width:'48px',height:'48px',float:'left'}} />Result</h1>
                            <Row className='justify-content-center' >
                                <Col className='m-3'  >
                                    <Row className='justify-content-center result-card ' >
                                        <Col className='text-center'>
                                        <img src ={plantName} style={{width:'88px',height:'88px'}} />
                                        <p className='result-title Poppins p-3' >Plant Name</p><p className='result-plant Poppins'>{props.plantName}</p></Col>
                                    </Row>
                                </Col>
                                <Col  className='m-3' >
                                    <Row className='justify-content-center result-card'>
                                        <Col className='text-center'>
                                        <img src ={accuracy} style={{width:'88px',height:'88px'}}/>
                                        <p className='result-title Poppins p-3'>Accuracy</p><p className='result-plant Poppins' style={{color:probColor()}}>{props.probability}</p></Col>
                                    </Row>
                                </Col>
                                <Col className='m-3' >
                                    <Row className='justify-content-center result-card'>
                                        <Col className='text-center'>
                                        <img src ={disease} style={{width:'88px',height:'88px'}}/>
                                        <p className='result-title Poppins p-3'>Disease</p><p className='result-plant Poppins text-capitalize'>{props.diseaseName}</p></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className='mt-5 Poppins disease-info-card'>
                                <Col>
                                <h1 className='title-card'>{props.diseaseName == 'healthy' || props.diseaseName == 'N/A' ? 'Plant Information': 'Disease Information:'}</h1>
                                <p style={{textAlign:'justify'}}>{props.description}</p></Col>
                            </Row>
                    </Col>


                    <Col className=' align-items-center align-self-center justify-content-center text-center'>
                        <img src={props.imgSRC} className='image-result m-3'  />
                    </Col>
        
                    <Row className='Poppins suggested-treatment-card'>
                    <Col  className=''>
                            <h1 className='title-card'>Suggested Treatment:</h1>
                            <p style={{textAlign:'justify'}}>{props.treatment}</p>
                        </Col>
                    </Row>


                </Row>

        </Container>
    );
}

export default PredictionResult;