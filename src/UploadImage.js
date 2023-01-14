import React from 'react';
import NavigationBar from './NavigationBar';
import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import {BsUpload} from 'react-icons/bs';
import { Button, Col, Container, Row, Alert } from 'react-bootstrap';
import { FileUploader } from "react-drag-drop-files";
import PredictionResult from './PredictionResult';
import Footer from './Footer';

const fileTypes = ["JPEG", "PNG","JPG"];
function UploadPage() {

    const [visible, setVisible] = useState(false)
    const [file, setFile] = useState(null);
    const [URLState,setURL] = useState(null)
    const [apiResult, updateResult] = useState(null)
    const [err,updateErr] = useState(false);
    const [errUpload,updateErrUpload] = useState(null)

    useEffect(() => {
      setVisible(true)
      console.log(visible)
      console.log(apiResult)
    },[apiResult])

    const handleChange = (file) => {
      console.log(file)
      var reader = new FileReader();
      var url = URL.createObjectURL(file)
      setURL(url)
      setFile(file);
    }

     async function handlePrediction(e) {

      if (file != null){

        const fd = new FormData()
        fd.append('img',file,file.name)
        console.log(fd)
         await axios.post('http://localhost:5000/image',fd,{withCredentials:true})
        .then(res => {
            
            console.log(res.data)
            updateResult(res.data)

        }).catch(err => updateErrUpload('Sorry, this file image is too large, please try cropping the content.'))
        
    }

    else {
      updateErr(true)
    }

    

    } 


    if(apiResult == null)

    return (
        
        <>
        <NavigationBar />
        <h1 className='text-capitalize text-center pb-2' style={{fontWeight:'lighter',color:'#212529',fontSize:'3rem',marginTop:'55px'}}>Upload the plant image here</h1>
        <Container className="justify-content-center text-center mt-4">
      <FileUploader
        id="test"
        handleChange={handleChange}
        name="img"
      
      />
      <br />
      {errUpload != null &&<Alert style={{width:'30%',margin:'auto'}} variant='warning'>{errUpload}</Alert> }
      <br />
      {URLState && <img src={URLState} />}
      <br />
      <p style={{fontFamily:'Poppins',fontWeight:'lighter'}}>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      
      <Row className='justify-content-center'>
      <Col style={{fontFamily:'Poppins'}} ><Button variant='dark' className='m-3' onClick={handlePrediction}>Predict Disease</Button> 
            <Button variant='secondary' className='m-3'>Identify Plant</Button>
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