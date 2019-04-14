/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import './WhiteBoard.css';

class WhiteBoard extends Component {
  componentDidMount() {
    const { loadSketch } = this.props;
    loadSketch(this._sketch);
  }

  render() {
    const {
      lineColor,

      lineWidth,
      tool,
      sketchChange,
      setMouseDown,
      controlledValue,
      saveImage,
    } = this.props;
    return (
      <Container className="white-board" onMouseDown={setMouseDown} onMouseUp={setMouseDown}>
        <Modal />
        <Button className="save-button" onClick={saveImage}>
          Save As Image
        </Button>
        <SketchField
          name="sketch"
          className="canvas"
          ref={comp => (this._sketch = comp)}
          lineColor={tool === 'eraser' ? '#fff' : lineColor}
          backgroundColor="#fff"
          lineWidth={lineWidth}
          width="100%"
          height="100%"
          // defaultValue={dataJson}
          value={controlledValue}
          forceValue
          onChange={sketchChange}
          tool={tool === 'eraser' ? Tools.Pencil : tool}
        />
      </Container>
    );
  }
}
WhiteBoard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types

  lineColor: PropTypes.string.isRequired,

  lineWidth: PropTypes.number.isRequired,
  tool: PropTypes.node,
  saveImage: PropTypes.func.isRequired,
  loadSketch: PropTypes.func.isRequired,
  sketchChange: PropTypes.func.isRequired,
  setMouseDown: PropTypes.func.isRequired,
  controlledValue: PropTypes.string,
};
WhiteBoard.defaultProps = {
  tool: undefined,
  controlledValue: undefined,
};
export default WhiteBoard;
