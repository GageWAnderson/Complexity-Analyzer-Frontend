import React, { useState } from 'react';
import ContainerCard from '../../components/ContainerCard/ContainerCard';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Container } from 'reactstrap';
import { updateApiKey } from '../../redux/profileSlice';

const Profile = () => {

  const { username, email, apiKey } = useSelector((state) => state.profile);
  const [showApiKey, setShowApiKey] = useState(false);

  const dispatch = useDispatch();

  const handleGetApiKey = () => {
    dispatch(updateApiKey({ apiKey: 'Insert API Key Here' }));
  };

  const renderMaskedApiKey = () => {
    if (!apiKey) {
      return null;
    } else if (showApiKey) {
      return apiKey;
    } else {
      return apiKey.substring(0, 4) + '************';
    }
  };

  const renderApiKeyDisplay = () => {
    if (!apiKey) {
      return (
        <>
          <Alert color='warning'>No API Key Found</Alert>
          <Button onClick={handleGetApiKey} color='primary'>Request your API key</Button>
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
