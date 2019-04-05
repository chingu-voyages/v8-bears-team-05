import React from 'react';
import Container from 'react-bootstrap/Container';

import ToolBox from './ToolBox';
import './WhiteBoard.css';

const WhiteBoard = () => {
  return (
    <Container className="white-board">
      <canvas id="canvas" />
      <ToolBox />
    </Container>
  );
};

export default WhiteBoard;
