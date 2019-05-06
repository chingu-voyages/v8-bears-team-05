import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Logo from '../Logo/Logo';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
  }

  componentDidMount() {
    const { setNotificationRef } = this.props;
    setNotificationRef(this.notificationDOMRef);
  }

  render() {
    const {
      setHostModal,
      setJoinModal,
      toggleAuthenticateModal,
      goToHome,
      pushToAbout,
      expanded,
      toggleNavbar,
    } = this.props;

    return (
      <>
        <ReactNotification ref={this.notificationDOMRef} />
        <Navbar className="py-4" bg="light" expand="lg" expanded={expanded} onToggle={toggleNavbar}>
          <Container>
            <Navbar.Brand href="" onClick={goToHome}>
              <Logo />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav>
                <Nav.Link href="" onClick={pushToAbout}>
                  About us
                </Nav.Link>

                <Nav.Link href="" onClick={setJoinModal}>
                  Join a meeting
                </Nav.Link>
                <Nav.Link href="" onClick={setHostModal}>
                  Host a meeting
                </Nav.Link>
                <Nav.Link href="" onClick={() => toggleAuthenticateModal('Sign in')}>
                  Sign in
                </Nav.Link>
                <Button variant="success" href="" onClick={() => toggleAuthenticateModal('Sign up')}>
                  Sign up
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

NavBar.propTypes = {
  setHostModal: PropTypes.func.isRequired,
  setJoinModal: PropTypes.func.isRequired,
  setNotificationRef: PropTypes.func.isRequired,
  toggleAuthenticateModal: PropTypes.func.isRequired,
  goToHome: PropTypes.func.isRequired,
  pushToAbout: PropTypes.func.isRequired,
  toggleNavbar: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default NavBar;
