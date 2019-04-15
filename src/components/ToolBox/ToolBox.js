import React from 'react';
import PropTypes from 'prop-types';

import {
  faEraser,
  faRedo,
  faUndo,
  faTimes,
  faTrash,
  faPencilAlt,
  faImage,
  faHighlighter,
  faFont,
  faMousePointer,
  faPlus,
  faSearchPlus,
  faSearchMinus,
  faPencilRuler,
} from '@fortawesome/free-solid-svg-icons';
import Range from 'react-range-progress';
import { Tools } from 'react-sketch';
import { faSquare, faCircle, faHandPaper } from '@fortawesome/free-regular-svg-icons';
import { CompactPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Collapse, Form, Button } from 'react-bootstrap';
import Tool from '../Tool/Tool';
import './ToolBox.css';

const ToolBox = ({
  lineWidth,
  lineColor,
  fillColor,
  changeColor,
  changeFillColor,
  rangeChanged,
  changeTool,
  eraserTool,
  selectedTool,
  zoomIn,
  zoomOut,
  undo,
  redo,
  clear,
  addTextOpen,
  toggleModal,
  removeSelected,
  clickAddText,
  addText,
  setText,
  highlightTool,
}) => {
  return (
    <>
      <div className="tools">
        <Tool
          selectTool={e => changeTool(e)}
          tool={Tools.Select}
          iconName={faMousePointer}
          selectedTool={selectedTool}
        />
        <Tool selectTool={e => changeTool(e)} tool={Tools.Pencil} iconName={faPencilAlt} selectedTool={selectedTool} />

        <Tool selectTool={e => clickAddText(e)} tool="text" iconName={faFont} selectedTool={selectedTool} />
        <Tool selectTool={eraserTool} tool="eraser" iconName={faEraser} selectedTool={selectedTool} />
        <Tool selectTool={e => changeTool(e)} tool={Tools.Rectangle} iconName={faSquare} selectedTool={selectedTool} />
        <Tool selectTool={e => changeTool(e)} tool={Tools.Line} iconName={faPencilRuler} selectedTool={selectedTool} />
        <Tool selectTool={e => changeTool(e)} tool={Tools.Circle} iconName={faCircle} selectedTool={selectedTool} />
        <Tool selectTool={toggleModal} tool={undefined} iconName={faImage} selectedTool={selectedTool} />
        <Tool selectTool={highlightTool} tool="highlighter" iconName={faHighlighter} selectedTool={selectedTool} />

        <Tool selectTool={zoomIn} tool="zoomin" iconName={faSearchPlus} selectedTool={selectedTool} />
        <Tool selectTool={zoomOut} tool="zoomout" iconName={faSearchMinus} selectedTool={selectedTool} />
        <Tool selectTool={e => changeTool(e)} tool={Tools.Pan} iconName={faHandPaper} selectedTool={selectedTool} />
        <Tool selectTool={removeSelected} tool="remove" iconName={faTimes} selectedTool={selectedTool} />
        <Tool selectTool={undo} tool={Tools.Undo} iconName={faUndo} selectedTool={selectedTool} />
        <Tool selectTool={redo} tool={Tools.Redo} iconName={faRedo} selectedTool={selectedTool} />
        <Tool selectTool={clear} tool={Tools.Clear} iconName={faTrash} selectedTool={selectedTool} />
      </div>
      <Collapse in={addTextOpen}>
        <Form>
          <Form.Group className="form-group">
            <Form.Control type="text" placeholder="Enter Text here..." onChange={setText} />
            <Button variant="light" onClick={addText}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Form.Group>
        </Form>
      </Collapse>
      <div className="tool-options">
        <p>Tool options</p>
        <p>Line Width:{lineWidth}</p>
        <Range
          value={lineWidth}
          fillColor={{
            r: 138,
            g: 43,
            b: 226,
            a: 0.75,
          }}
          trackColor={{
            r: 223,
            g: 233,
            b: 223,
            a: 0.5,
          }}
          thumbColor={{
            r: 46,
            g: 43,
            b: 226,
            a: 0.5,
          }}
          height={12}
          width="80%"
          onChange={rangeChanged}
          max={30}
        />
        <p>Line Color</p>
        <CompactPicker color={lineColor} onChangeComplete={changeColor} />;<p>Fill Color</p>
        <CompactPicker color={fillColor} onChangeComplete={changeFillColor} />;
      </div>
    </>
  );
};
ToolBox.propTypes = {
  lineWidth: PropTypes.number.isRequired,
  lineColor: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
  changeColor: PropTypes.func.isRequired,
  changeFillColor: PropTypes.func.isRequired,
  rangeChanged: PropTypes.func.isRequired,
  changeTool: PropTypes.func.isRequired,
  eraserTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.node.isRequired,
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  removeSelected: PropTypes.func.isRequired,
  addTextOpen: PropTypes.bool.isRequired,
  clickAddText: PropTypes.func.isRequired,
  addText: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  highlightTool: PropTypes.func.isRequired,
};
export default ToolBox;
