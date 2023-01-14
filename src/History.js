import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Container,Row,Col,Table } from 'react-bootstrap';
import NavigationBar from './NavigationBar.js'
import Footer from './Footer.js';

function History() {
    
    const [data,updateData] = useState(null)
  
    useEffect(() => {
        axios.get('http://localhost:5000/history',{withCredentials:true})
        .then(res => {
            
            updateData(res.data)
        })

        

    },[])
    
    
    return (
        <>
        <NavigationBar />
        <Container>
            <h3 className='Poppins text-center m-3'>Your Prediciton History, {sessionStorage.getItem('name')}</h3>
            <Table striped bordered hover size="md" className='Poppins' style={{verticalAlign:'middle',borderRadius:'25px'}}>
                <thead>
                    <tr className='' >
                    <th>Prediction Result</th>
                    <th>Prediction Accuracy</th>
                    <th>Image</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data != null && data.map(arr => {
                        return (
                            <tr>
                                <td>{arr[0]}</td>
                                <td>{Number(arr[3]*100).toFixed(1)}</td>
                                <td><img src={`data:image/jpeg;base64,${arr[1]}`} style={{width:'128px',height:'128px',borderRadius:'25px'}} /></td>
                                <td>{arr[2]}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </Table>        
        </Container>
        <Footer />
        </>
    );
}

export default History;