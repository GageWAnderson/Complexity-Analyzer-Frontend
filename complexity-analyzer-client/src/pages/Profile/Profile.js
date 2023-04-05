import React, { useState } from 'react';
import ContainerCard from '../../components/ContainerCard/ContainerCard';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Container } from 'reactstrap';
import { updateApiKey } from '../../redux/profileSlice';
import awsData from '../../data/aws-data';
import { Auth } from 'aws-amplify';
const AWS = require('aws-sdk');

const Profile = () => {

  const { username, email, apiKey } = useSelector((state) => state.profile);
  const [showApiKey, setShowApiKey] = useState(false);
  const [getApiKeyError, setGetApiKeyError] = useState(false);

  const dispatch = useDispatch();

  const apiGateway = new AWS.APIGateway({ region: awsData.apiGatewayRegion });

  const getApiKey = (userId) => {
    Auth.currentCredentials()
      .then((credentials) => {
        AWS.config.credentials = credentials;
        const params = {
          customerId: userId,
          includeValues: true,
        };
        apiGateway.getApiKeys(params, function (err, data) {
          if (err) {
            console.log(err);
            setGetApiKeyError(true);
            return null;
          } else {
            setGetApiKeyError(false);
            console.log(data);
            if (data.items.length > 0) {
              return data.items[0].value;
            } else {
              return null;
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return null;
      })
  };

  const createApiKey = (userId) => {
    Auth.currentCredentials()
      .then((credentials) => {
        AWS.config.credentials = credentials;
        const params = {
          customerId: userId,
          enabled: true,
          name: `API Key for user ${userId}`,
        };
        apiGateway.createApiKey(params, function (err, data) {
          if (err) {
            console.log(err);
            setGetApiKeyError(true);
          } else {
            setGetApiKeyError(false);
            console.log(data);
            dispatch(updateApiKey({apiKey: data.value}));
          }
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const requestApiKey = (event) => {
    event.preventDefault();
    const apiKey = getApiKey(username);
    if (apiKey) {
      dispatch(updateApiKey({apiKey: apiKey}));
    } else {
      createApiKey(username);
    }
  };

  const renderMaskedApiKey = () => {
    if (!apiKey || apiKey.length === 0) {
      return null;
    } else if (showApiKey) {
      return apiKey;
    } else {
      return apiKey.substring(0, 4) + '************';
    }
  };

  const renderApiKeyDisplay = () => {
    if (getApiKeyError) {
      return (
        <>
          <Alert color='danger'>Error getting API Key</Alert>
          <Button onClick={requestApiKey} color='primary'>Retry</Button>
        </>
      );
    } else if (!apiKey) {
      return (
        <>
          <Alert color='warning'>No API Key Found</Alert>
          <Button onClick={requestApiKey} color='primary'>Request your API key</Button>
        </>
      );
    } else {
      return (
        <>
          <Alert color='success'>Your API Key: {renderMaskedApiKey()}</Alert>
          <Button color='primary' onClick={() => setShowApiKey(!showApiKey)}>{showApiKey ? "Hide Key" : "Show Key"}</Button>
        </>
      );
    }
  };

  // TODO: Add buttons to update user information
  //   Use AWS Amplify for this
  return (
    <>
      <br />
      <br />
      <br />
      <ContainerCard>
        <h1>Profile Information</h1>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <Container>
          {renderApiKeyDisplay()}
        </Container>
      </ContainerCard>
    </>

  );
};

export default Profile;
