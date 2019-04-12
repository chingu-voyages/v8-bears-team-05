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
      modalOpen: false,
    };
  }

  generateIDs = () => {
    this.setState(prevProps => ({
      modalOpen: !prevProps.modalOpen,
    }));
  };

  render() {
    const { modalOpen } = this.state;
    return (
      <>
        <BrowserRouter>
          <NavBar generateIDs={this.generateIDs} modalOpen={modalOpen} />
          <Container fluid className="app">
            <Route
              path="/"
              exact
              render={(modalOpen, generateIDs) => <Homepage modalOpen={modalOpen} closeModal={this.generateIDs} />}
            />
            <Route path="/boardandeditor" component={BoardandEditor} />
          </Container>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
