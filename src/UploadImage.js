import React from 'react';
import NavigationBar from './NavigationBar';
import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import {BsUpload} from 'react-icons/bs';
import { Button, Col, Container, Row, Alert } from 'react-bootstrap';
import { FileUploader } from "react-drag-drop-files";
import PredictionResult from './PredictionResult';
import Footer from './Footer';
import g1 from './icons/exampleGood1.JPG';
import {Spinner} from 'react-bootstrap'
import g2 from './icons/exampleGood2.JPG';
import g3 from './icons/exampleGood3.JPG';
import b1 from './icons/exampleBad1.jpg';
import b2 from './icons/exampleBad2.jpg';
import b3 from './icons/exampleBad3.jpg';
import {AiOutlineClose} from 'react-icons/ai'

const fileTypes = ["JPEG", "PNG","JPG","SVG"];
function UploadPage() {

    const [visible, setVisible] = useState(false)
    const [fillColor,updateFillColor] = useState('gray')
    const [isOpen, setIsOpen] = useState(sessionStorage.getItem('noPopUp'));
    const [file, setFile] = useState(null);
    const [URLState,setURL] = useState(null)
    const [apiResult, updateResult] = useState(null)
    const [err,updateErr] = useState(false);
    const [errUpload,updateErrUpload] = useState(null)
    const [waitingResult,setWaitingResult] = useState(false)

    useEffect(() => {
      setVisible(true)
    },[apiResult])

    const handleChange = (file) => {
      var reader = new FileReader();
      var url = URL.createObjectURL(file)
      setURL(url)
      setFile(file);
    }

     async function handlePrediction(e) {

      if (file != null){

        const fd = new FormData()
        fd.append('img',file,file.name)
        setWaitingResult(true)
         await axios.post('https://52.208.80.193/image',fd)
        .then(res => {
            
            updateResult(res.data)
            setWaitingResult(false)

        }).catch(err => {
          console.log(err)
          if(err.message == "Network Error") {
            updateErrUpload("Sorry, the server is currently offline due to the team working on the model, please try again later !")
          }
          else {
            updateErrUpload('Sorry, this file image is too large, please try cropping the content.');
           
          }
          setWaitingResult(false)
         
        })
        
    }

    else {
      updateErr(true)
    }

    

    } 


    if(apiResult == null)

    return (
        
        <>
        <NavigationBar />
        {isOpen == null && (
        <div onClick={() => {sessionStorage.setItem('noPopUp', true);setIsOpen(false);}} style={{
          position:'absolute',
          display:'flex',
          alignItems:'center',
          alignSelf:'center',
          top:'0%',
          left:'0%',
          bottom:'0%',
          right:'0%',
          height:'100vh',
          width:'100%',
          background:'rgba(0, 0, 0, 0.5)',
          
        }}>
         <Container onClick={() => sessionStorage.setItem('noPopUp', true)} style= {{
         
          
          background:'white',
          padding:'25px',
          borderRadius:'25px',
          zIndex:1,
         }} >
          <AiOutlineClose className='crossIcon'  style={{float:'right',width:'32px',height:'32px'}} onClick={() => setIsOpen(false)} />
        
          <h1 className='Poppins m-3 mb-5 popUp-header' >Help our model to predict better</h1>
            <p className='Poppins m-2 popUp-text' >please make sure that you take the picture of your plant in a way that:
            </p>
            <ul className='Poppins m-2'>
              <li>There is no green background (or a background that has other plants)</li>
              <li>Ensure that only the leaf is in the photo</li>
            </ul>
            <br />
            <Row className='justify-content-center text-center m-3 mb-5'>
           
              <Col className='justify-content-center text-center'>
                <h2 className='Poppins' style={{color:'#555c79'}}>good picture</h2>
                
                <img className='m-1 pictureExample' src={g1} />
                <img className='m-1 pictureExample' src={g2} />
              </Col>
         
            
            <Col className='justify-content-center text-center'>
                <h2 className='Poppins' style={{color:'#555c79'}}>bad picture</h2>
               
                <img className='m-1 pictureExample' src={b1} />
                <img className='m-1 pictureExample' src={b2} />
              </Col>
            </Row>
            
         </Container>
        </div>
      )}
     
        <Container className="justify-content-center text-center bg-light" style={{borderRadius:'35px',marginTop:'35px'}}>
        <h1 className='text-capitalize text-center pb-2 mb-4' style={{fontWeight:'lighter',color:'#212529',fontSize:'3.5rem',paddingTop:'25px'}}>Upload the plant image here</h1>
      <FileUploader
      style={{margin:'auto'}}
        id="test"
        handleChange={handleChange}
        name="img"
        types={fileTypes}
      
      />
      <br />
      {errUpload != null &&<Alert style={{width:'40%',margin:'auto'}} variant='warning'>{errUpload}</Alert> }
      <br />
      {URLState && <img src={URLState} style={{width:'256px',height:'256px'}} />}
      <br />
      <p style={{fontFamily:'Poppins',fontWeight:'lighter'}}>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      
      <Row className='justify-content-center'>
      <Row className='d-flex'>
        {waitingResult && <Spinner animation="border" variant="dark" style={{margin:'auto'}}/>}
      </Row>
      <Col style={{fontFamily:'Poppins'}} ><Button variant='dark' className='m-3' onClick={handlePrediction}>Predict Disease/Identify Plant</Button> 
      
      </Col>
      </Row>
      {err &&<Alert style={{width:'30%',margin:'auto'}} variant='warning'>You haven't uploaded an image!</Alert> }
    
        </Container>
        <Footer />

   
        </>
    );

    else {
      return (
              <>
              <NavigationBar />
              <PredictionResult plantName = {apiResult.plant_name} diseaseName={apiResult.disease} probability = {(100* apiResult.probability).toFixed(1)} imgSRC = {URLState} description = {apiResult.description} treatment = {apiResult.treatment} /> 
              <Footer />
              </>
               
      );
      
    }

   
    
}

export default UploadPage;