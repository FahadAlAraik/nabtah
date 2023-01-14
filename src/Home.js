import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";
import { BrowserRouter,Link,Route,Routes,useNavigate } from "react-router-dom";
import Login from "./Login";
import { useState,useEffect } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import LandingPage from "./LandingPage";
import Objectives from "./Objectives";
import Plants from "./Plants";
import Footer from "./Footer";
import History from "./History";

export default function Home() {

    const [user,setUser] = useState('')
   

    

    return (

        
        <>
        <NavigationBar />
        <LandingPage  />
        <Objectives />
        <Plants />
        <Footer />
        </>
        
            
        )





}