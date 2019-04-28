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
    let { lineColor, lineWidth, tool } = this.props;
    const { sketchChange, controlledValue, saveImage, fillColor, canvasRef } = this.props;
    switch (tool) {
      case 'highlighter':
        tool = Tools.Pencil;
        lineColor = 'rgba(240, 255, 0, 0.5)';
        lineWidth = 18;
        break;
      case 'eraser':
        tool = Tools.Pencil;
        lineColor = '#fff';
        lineWidth = 15;
        break;
      case Tools.Rectangle:
        lineWidth = 2;
        break;
      case Tools.Circle:
        lineWidth = 2;
        break;
      default:
        break;
    }

    return (
      <Container className="white-board" ref={canvasRef}>
        <Modal />
        <Button className="save-button" onClick={saveImage}>
          Save As Image
        </Button>
        <SketchField
          name="sketch"
          className="canvas"
          ref={comp => (this._sketch = comp)}
          lineColor={lineColor}
          backgroundColor="#fff"
          fillColor={fillColor}
          lineWidth={lineWidth}
          width="100%"
          height="100%"
          // defaultValue={dataJson}
          value={controlledValue}
          // forceValue
          onChange={sketchChange}
          tool={tool}
        />
      </Container>
    );
  }
}
WhiteBoard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types

  lineColor: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
  lineWidth: PropTypes.number.isRequired,
  tool: PropTypes.node,
  saveImage: PropTypes.func.isRequired,
  loadSketch: PropTypes.func.isRequired,
  sketchChange: PropTypes.func.isRequired,
  canvasRef: PropTypes.func.isRequired,
  controlledValue: PropTypes.string,
};
WhiteBoard.defaultProps = {
  tool: undefined,
  controlledValue: undefined,
};
export default WhiteBoard;
