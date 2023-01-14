import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './NavigationBar.css'
import './Login.css'
import './Plants.css'
import './UploadImage.css'
import './PredictionResult.css'
import './Account.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import Nav from './NavigationBar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
