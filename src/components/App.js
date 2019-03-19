import React from 'react';
import Container from 'react-bootstrap/Container';
import HomePage from './HomePage';
import BoardandEditor from './BoardandEditorTabs';
import './App.css';

const App = () => {
  return (
    <Container fluid className="app">
      <HomePage />
      <BoardandEditor />
    </Container>
  );
};

export default App;
