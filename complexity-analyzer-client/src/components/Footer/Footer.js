import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="fixed-bottom bg-dark text-white py-2">
      <Container>
        <Row xs="1">
          <Col className="d-flex justify-content-center">
            <p style={{marginRight: '16px'}}><b>Contact:</b> Gage Anderson</p>
            <p style={{marginRight: '16px'}}><b>Email:</b> Gage.W.Anderson@gmail.com</p>
            <p><b>LinkedIn:</b> https://www.linkedin.com/in/gagewanderson/</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
