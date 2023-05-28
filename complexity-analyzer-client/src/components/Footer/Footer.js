import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="fixed-bottom bg-dark text-white py-2">
      <Container>
        <Row xs="1">
          <Col className="d-flex justify-content-center">
            <p style={{ marginRight: '16px' }}><b>Contact:</b> Gage Anderson</p>
            <p style={{ marginRight: '16px' }}><b>Email:</b> Gage.W.Anderson@gmail.com</p>
            <a style={{ marginRight: '16px' }} href='https://www.linkedin.com/in/gagewanderson/'>LinkedIn</a>
            <a href='https://github.com/GageWAnderson'>GitHub</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
