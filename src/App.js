import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Link,Route,Routes,useNavigate } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Register from './Register';
import NotFound from './NotFound';
import Logged from './Logged';
import axios from 'axios';
import { useState,useLayoutEffect, useRef, useEffect } from 'react';
import UploadPage from './UploadImage';


function App() {

  const [user,setUser] = useState('')




  return (
   <BrowserRouter>

    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path="/login" element={sessionStorage.getItem('logged') ? <Logged /> :<Login/>}></Route>
      <Route path="/register" element={sessionStorage.getItem('logged') ? <Logged /> :<Register/>}></Route>
      {sessionStorage.getItem('logged') && <Route path ='/image' element={<UploadPage />}></Route> }
      <Route path ='*' element={<NotFound />}></Route>
    </Routes>

   
   </BrowserRouter>
  );
  
}

export default App;
