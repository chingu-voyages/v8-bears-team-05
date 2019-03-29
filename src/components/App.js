import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route } from 'react-router-dom';

import BoardandEditor from './BoardandEditorTabs';
import Homepage from './Homepage';
import NavBar from './NavBar';
import './App.css';

const App = () => {
  return (
    <>
      <NavBar />
      <Container fluid className="app">
        <BrowserRouter>
          <Route path="/" exact component={Homepage} />
          <Route path="/boardandeditor" component={BoardandEditor} />
        </BrowserRouter>
      </Container>
    </>
  );
};

export default App;
