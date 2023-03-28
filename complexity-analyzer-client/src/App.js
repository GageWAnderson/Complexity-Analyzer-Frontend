import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_adwuZs29p',
    userPoolWebClientId: '5771nsbuqkdbhp0vahm3vv3sak',
    mandatorySignIn: true,
  }
});

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Home />
      </div>
    </BrowserRouter>
  )
}

export default App;
