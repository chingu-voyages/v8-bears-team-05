import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Logo from './Logo';
import './NavBar.css';

const NavBar = () => {
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
            <Nav.Link href="#trynow">Try Now</Nav.Link>
            <Nav.Link href="#joinameeting">Join a meeting</Nav.Link>
            <Nav.Link href="#hostameeting">Host a meeting</Nav.Link>
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

export default NavBar;
