import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the Bootstrap icons CSS

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-4 footer-bottom-fixed">
      <Container fluid className="py-4">
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              &copy; {new Date().getFullYear()} CARE DON'T CARE. All rights reserved.
            </p>
            <p>
              <i className="bi bi-emoji-smile-fill me-1"></i>
              <i className="bi bi-emoji-smile-fill me-1"></i>
              <i className="bi bi-emoji-smile-fill"></i>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
