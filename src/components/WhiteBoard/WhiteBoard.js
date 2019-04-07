/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { SketchField } from 'react-sketch';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import './WhiteBoard.css';

class WhiteBoard extends Component {
  componentDidMount() {
    const { loadSketch } = this.props;
    loadSketch(this._sketch);
  }

  render() {
    const { lineColor, lineWidth, tool, sketchChange, setMouseDown, mouseMove } = this.props;
    return (
      <Container className="white-board" onMouseDown={setMouseDown} onMouseUp={setMouseDown} onMouseMove={mouseMove}>
        <SketchField
          name="sketch"
          className="canvas"
          ref={comp => (this._sketch = comp)}
          lineColor={lineColor}
          lineWidth={lineWidth}
          width="100%"
          height="100%"
          // defaultValue={dataJson}
          // value={controlledValue}
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
  lineWidth: PropTypes.number.isRequired,
  tool: PropTypes.node,
  loadSketch: PropTypes.func.isRequired,
  sketchChange: PropTypes.func.isRequired,
  setMouseDown: PropTypes.func.isRequired,
  mouseMove: PropTypes.func.isRequired,
};
WhiteBoard.defaultProps = {
  tool: undefined,
};
export default WhiteBoard;
