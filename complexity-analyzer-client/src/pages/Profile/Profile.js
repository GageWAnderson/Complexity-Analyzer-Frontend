import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

const Profile = ({ username, email }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="profile-card">
            <CardBody>
              <h1 className="profile-title">{username}</h1>
              <p className="profile-email">{email}</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
