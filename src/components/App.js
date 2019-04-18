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

  addNotification = () => {
    const { notificationRef } = this.state;
    notificationRef.current.addNotification({
      title: 'Awesomeness',
      message: 'Awesome Notifications!',
      type: 'danger',
      insert: 'top',
      container: 'top-center',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 3000 },
      dismissable: { click: true },
    });
  };

  render() {
    const { hostModalOpen, joinModalOpen, joinID } = this.state;
    return (
      <>
        <NavBar
          toggleHostModal={this.toggleHostModal}
          toggleJoinModal={this.toggleJoinModal}
          setNotificationRef={this.setNotificationRef}
        />
        <Container fluid className="app">
          <Route
            path="/"
            exact
            render={() => <Homepage joinModalOpen={joinModalOpen} toggleJoinModal={this.toggleJoinModal} />}
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
