import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsData from './data/aws-data';
import { updateUser } from './redux/profileSlice';
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

const App = ({ signOut, user }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUser({ username: user.username, email: user.attributes.email, uuid: user.attributes.sub }));
  }, [dispatch, signOut, user]);

  return (
    <BrowserRouter>
      <div className="App">
        <Home />
      </div>
    </BrowserRouter>
  )
}

export default withAuthenticator(App);
