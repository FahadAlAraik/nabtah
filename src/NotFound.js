import React from 'react';
import Alert from 'react-bootstrap/Alert';
import {Container} from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import { Link } from 'react-router-dom';
function NotFound() {
    
    
    return (
        <>         
        <NavigationBar />

        <Container fluid className="p-5">
            <Container  className="p-5">
                <h2 className="display-4 m-4 Poppins">The page you requested does not exist</h2>
                <hr />
                <p className='Poppins m-4' style={{fontSize:'1.5rem'}}>please make sure you entered the corrrect URL</p>
                <a href="/" className="btn btn-dark Poppins m-4">Go back home</a>
            </Container>
        </Container>
{/* 
            <Alert className='text-center center-alert'  variant='danger'>
                Error 404, Page not found
            </Alert> */}
        </>
    );
}

export default NotFound;