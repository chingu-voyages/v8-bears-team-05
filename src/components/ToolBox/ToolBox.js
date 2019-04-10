import React from 'react';
import PropTypes from 'prop-types';

import {
  faEraser,
  faRedo,
  faUndo,
  faTimes,
  faPencilAlt,
  faImage,
  faHighlighter,
  faFont,
  faMousePointer,
} from '@fortawesome/free-solid-svg-icons';
import Range from 'react-range-progress';
import { Tools } from 'react-sketch';
import { faSquare, faCircle } from '@fortawesome/free-regular-svg-icons';
import { CompactPicker } from 'react-color';
import Tool from '../Tool/Tool';
import './ToolBox.css';

const ToolBox = ({
  lineWidth,
  lineColor,
  changeColor,
  rangeChanged,
  changeTool,
  selectedTool,
  undo,
  redo,
  clear,
  toggleModal,
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
        <Tool selectTool={e => changeTool(e)} tool={undefined} iconName={faFont} selectedTool={selectedTool} />
        <Tool selectTool={e => changeTool(e)} tool={undefined} iconName={faEraser} selectedTool={selectedTool} />
        <Tool selectTool={e => changeTool(e)} tool={Tools.Rectangle} iconName={faSquare} selectedTool={selectedTool} />
        <Tool selectTool={e => changeTool(e)} tool={Tools.Circle} iconName={faCircle} selectedTool={selectedTool} />
        <Tool selectTool={toggleModal} tool={undefined} iconName={faImage} selectedTool={selectedTool} />
        <Tool selectTool={e => changeTool(e)} tool={undefined} iconName={faHighlighter} selectedTool={selectedTool} />

        <Tool selectTool={undo} tool={Tools.Undo} iconName={faUndo} selectedTool={selectedTool} />
        <Tool selectTool={redo} tool={Tools.Redo} iconName={faRedo} selectedTool={selectedTool} />
        <Tool selectTool={clear} tool={Tools.Clear} iconName={faTimes} selectedTool={selectedTool} />
      </div>
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
        <CompactPicker color={lineColor} onChangeComplete={changeColor} />;
      </div>
    </>
  );
};
ToolBox.propTypes = {
  lineWidth: PropTypes.number.isRequired,
  lineColor: PropTypes.string.isRequired,
  changeColor: PropTypes.func.isRequired,
  rangeChanged: PropTypes.func.isRequired,
  changeTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.node.isRequired,
  toggleModal: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};
export default ToolBox;
