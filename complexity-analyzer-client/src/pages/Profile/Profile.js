import React from 'react';
import ContainerCard from '../../components/ContainerCard/ContainerCard';
import { useSelector } from 'react-redux';

const Profile = () => {

  const { username, email } = useSelector((state) => state.profile);

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
      </ContainerCard>
    </>

  );
};

export default Profile;
