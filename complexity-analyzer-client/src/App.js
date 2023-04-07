import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Amplify, Auth } from 'aws-amplify';
import awsData from './data/aws-data';
import { Authenticator } from '@aws-amplify/ui-react';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_ifZr0x8em",
    userPoolWebClientId: "694aul1asptgmbiu3g28128qqs",
    identityPoolId: "us-east-1:6c22e840-d4d7-4008-b793-078a2cc98797",
  },
  API: {
    endpoints: [
      {
        name: awsData.apiGatewayName,
        endpoint: awsData.endpoint,
        region: "us-east-1",
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          }
        }
      },
    ]
  },
});

const App = () => {

  const signedIn = useSelector(state => state.profile.signedIn);

  const renderApp = (signOut, user) => {
    return (
      <BrowserRouter>
        <div className="App">
          <Home user={user} signOut={signOut} />
        </div>
      </BrowserRouter>
    );
  };

  return (
    <Container className={`${signedIn ? '' : 'd-flex justify-content-center align-items-center'}`} style={{ height: '100vh' }}>
      <Authenticator loginMechanisms={['username', 'email']}>
        {({ signOut, user }) => (
          <main>
            {renderApp(signOut, user)}
          </main>
        )}
      </Authenticator>
    </Container>
  );

}

export default App;
