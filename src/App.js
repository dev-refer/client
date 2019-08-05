import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
// import Recaptcha from 'react-recaptcha'
import Base from './components/Base.js';
import loginImage from './imageAssets/login-image.svg';
import apjiLogo from './imageAssets/apji2@3x.png'
import { Col } from 'reactstrap';
import './pages/login/login.css';
import { ClipLoader, SyncLoader } from 'react-spinners';

import ENV from './environment.js'
import API from './apiCaller.js'

class App extends Component {

  render() {

   
      return (
        <div className="App">
        <Base /> {/* <Login /> */}
      </div>
      )
    
  }

}

export default App;
