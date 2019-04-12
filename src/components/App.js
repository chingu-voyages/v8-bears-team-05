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
    };
  }

  toggleHostModal = () => {
    const { location, history } = this.props;
    console.log(location);
    if (location.pathname === '/') {
      this.setState(prevState => ({
        ...prevState,
        hostModalOpen: !prevState.hostModalOpen,
      }));
      history.push('/boardandeditor');
    }
  };

  toggleJoinModal = () => {
    const { location, history } = this.props;
    console.log(location);
    if (location.pathname === '/') {
      this.setState(prevState => ({
        ...prevState,
        joinModalOpen: !prevState.joinModalOpen,
      }));
      history.push('/boardandeditor');
    }
  };

  render() {
    const { hostModalOpen, joinModalOpen } = this.state;
    return (
      <>
        <NavBar toggleHostModal={this.toggleHostModal} toggleJoinModal={this.toggleJoinModal} />
        <Container fluid className="app">
          <Route
            path="/"
            exact
            render={() => <Homepage joinModalOpen={joinModalOpen} toggleJoinModal={this.toggleJoinModal} />}
          />
          <Route
            path="/boardandeditor"
            render={() => <BoardandEditor hostModalOpen={hostModalOpen} joinModalOpen={joinModalOpen} />}
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
