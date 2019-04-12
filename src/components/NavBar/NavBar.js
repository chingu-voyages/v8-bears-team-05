import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

import Logo from '../Logo/Logo';
import './NavBar.css';

const NavBar = ({ toggleHostModal, toggleJoinModal }) => {
  return (
    <Navbar className="py-4" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#aboutus">About us</Nav.Link>

            <Nav.Link href="#joinameeting" onClick={toggleJoinModal}>
              Join a meeting
            </Nav.Link>
            <Nav.Link href="#hostameeting" onClick={toggleHostModal}>
              Host a meeting
            </Nav.Link>
            <Nav.Link href="#whiteboard">White Board</Nav.Link>
            <Nav.Link href="#signin">Sign in</Nav.Link>
            <Button variant="success" href="#signup">
              Sign up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  toggleHostModal: PropTypes.func.isRequired,
  toggleJoinModal: PropTypes.func.isRequired,
};

export default NavBar;
