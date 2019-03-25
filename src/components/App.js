import React from 'react';
import Container from 'react-bootstrap/Container';
import HomePage from './HomePage';
import BoardandEditor from './BoardandEditorTabs';
import NavBar from './NavBar';
import './App.css';

const App = () => {
  return (
    <>
      <NavBar />
      <Container fluid className="app">
        <HomePage />
        <BoardandEditor />
      </Container>
    </>
  );
};

export default App;
