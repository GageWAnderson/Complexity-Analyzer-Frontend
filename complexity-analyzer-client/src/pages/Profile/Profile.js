import React from 'react';
import ContainerCard from '../../components/ContainerCard/ContainerCard';
import { useSelector } from 'react-redux';

const Profile = () => {

  const { username, email } = useSelector((state) => state.profile);

  return (
    <ContainerCard>
    <h1>Profile Information</h1>
    <p>Username: {username}</p>
    <p>Email: {email}</p>
  </ContainerCard>

  );
};

export default Profile;
