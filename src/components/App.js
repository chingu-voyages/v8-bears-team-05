/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route } from 'react-router-dom';

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
    this.setState(prevState => ({
      ...prevState,
      hostModalOpen: !prevState.hostModalOpen,
    }));
  };

  toggleJoinModal = () => {
    this.setState(prevState => ({
      ...prevState,
      joinModalOpen: !prevState.joinModalOpen,
    }));
  };

  render() {
    const { hostModalOpen, joinModalOpen } = this.state;
    return (
      <>
        <BrowserRouter>
          <NavBar toggleHostModal={this.toggleHostModal} toggleJoinModal={this.toggleJoinModal} />
          <Container fluid className="app">
            <Route
              path="/"
              exact
              render={() => (
                <Homepage
                  hostModalOpen={hostModalOpen}
                  toggleHostModal={this.toggleHostModal}
                  joinModalOpen={joinModalOpen}
                  toggleJoinModal={this.toggleJoinModal}
                />
              )}
            />
            <Route path="/boardandeditor" component={BoardandEditor} />
          </Container>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
