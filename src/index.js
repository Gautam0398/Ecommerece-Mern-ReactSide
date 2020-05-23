import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Routes from './Routes';


const options = {
 
  position: positions.MIDDLE,
  timeout: 10000,
  offset: '30px',
  transition: transitions.SCALE
} 


ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
    <Routes />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

