import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import { updateUser } from './redux/profileSlice';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

const App = ({ signOut, user }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUser({ username: user.username, email: user.attributes.email }));
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
