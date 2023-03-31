import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import awsData from './data/aws-data';
import { updateUser } from './redux/profileSlice';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    region: awsconfig.aws_cognito_region,
    userPoolId: awsconfig.aws_user_pools_id,
    userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
    identityPoolId: awsconfig.aws_cognito_identity_pool_id,
  },
  API: {
    endpoints: [
      {
        name: awsData.apiGatewayName,
        endpoint: awsData.endpoint,
        region: awsconfig.aws_project_region,
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
