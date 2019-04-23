/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { withRouter, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import BoardandEditor from './BoardandEditor/BoardandEditorTabs';
import Homepage from './Homepage/Homepage';
import NavBar from './NavBar/NavBar';
import AuthenticateModal from './authenticateModal/authenticateModal';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostModalOpen: false,
      joinModalOpen: false,
      joinID: '',
      message: '',
      messageType: '',
      notificationRef: {},
      authenticateModalOpen: false,
    };
  }

  setNotificationRef = notificationRef => {
    this.setState({ notificationRef });
  };

  toggleHostModal = () => {
    const { location, history } = this.props;

    if (location.pathname === '/') {
      history.push('/boardandeditor');
    }
    this.setState(prevState => ({
      ...prevState,
      hostModalOpen: !prevState.hostModalOpen,
    }));
  };

  setMessage = (message, messageType) => {
    // set messages for the notification

    const { notificationRef } = this.state;
    notificationRef.current.addNotification({
      // title: 'Awesomeness',
      message,
      type: messageType,
      insert: 'top',
      container: 'top-center',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 3000 },
      dismissable: { click: true },
    });
  };

  toggleJoinModal = () => {
    const { location, history } = this.props;
    if (location.pathname === '/') {
      history.push('/boardandeditor');
    }
    this.setState(prevState => ({
      ...prevState,
      joinModalOpen: !prevState.joinModalOpen,
    }));
  };

  handleIDChange = e => {
    this.setState({
      ...this.state,
      joinID: e.target.value,
    });
    // console.log(this.state.joinID)
  };

  toggleAuthenticateModal = value => {
    this.setState(prevState => ({
      authenticateModalOpen: !prevState.authenticateModalOpen,
      typeofauthentication: value,
    }));
  };

  render() {
    const {
      hostModalOpen,
      joinModalOpen,
      joinID,
      authenticateModalOpen,
      toggleAuthenticateModal,
      typeofauthentication,
    } = this.state;
    return (
      <>
        <NavBar
          toggleHostModal={this.toggleHostModal}
          toggleJoinModal={this.toggleJoinModal}
          setNotificationRef={this.setNotificationRef}
          authenticateModalOpen={authenticateModalOpen}
          toggleAuthenticateModal={this.toggleAuthenticateModal}
        />

        <Container fluid className="app">
          <Route
            path="/"
            exact
            render={() => (
              <Homepage
                joinModalOpen={joinModalOpen}
                toggleJoinModal={this.toggleJoinModal}
                toggleAuthenticateModal={this.toggleAuthenticateModal}
                authenticateModalOpen={authenticateModalOpen}
                typeofauthentication={typeofauthentication}
              />
            )}
          />
          <Route
            path="/boardandeditor"
            render={() => (
              <BoardandEditor
                hostModalOpen={hostModalOpen}
                joinModalOpen={joinModalOpen}
                toggleHostModal={this.toggleHostModal}
                toggleJoinModal={this.toggleJoinModal}
                changeJoinID={this.handleIDChange}
                joinID={joinID}
                setMessage={this.setMessage}
                authenticateModalOpen={authenticateModalOpen}
                toggleAuthenticateModal={this.toggleAuthenticateModal}
                typeofauthentication={typeofauthentication}
              />
            )}
          />
        </Container>
      </>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(App);
