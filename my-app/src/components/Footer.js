import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-lg-start text-white mt-4 footer-bottom-fixed">
      <Container fluid className="py-4">
        <Row>
          <Col className="text-center">
            <p className="mb-0">
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