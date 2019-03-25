import React from 'react';
import Container from 'react-bootstrap/Container';
import BoardandEditor from './BoardandEditorTabs';
import NavBar from './NavBar';
import './App.css';

const App = () => {
  return (
    <>
      <NavBar />
      <Container fluid className="app">
        <BoardandEditor />
      </Container>
    </>
  );
};

export default App;
