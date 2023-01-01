import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
function NotFound() {
    
    
    return (
        <div>
        <Link to='/'>
            Go back home
        </Link>

            <Alert className='text-center center-alert'  variant='danger'>
                Error 404, Page not found
            </Alert>
        </div>
    );
}

export default NotFound;