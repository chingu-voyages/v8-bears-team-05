import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEraser, faRedo, faUndo, faTimes } from '@fortawesome/free-solid-svg-icons';

import './ToolBox.css';

class ToolBox extends Component {
  state = {
    // selectedTool: null,
  };

  render() {
    return (
      <div className="toolbox">
        <FontAwesomeIcon icon={faPen} />

        <FontAwesomeIcon icon={faEraser} />
        <FontAwesomeIcon icon={faRedo} />
        <FontAwesomeIcon icon={faUndo} />
        <FontAwesomeIcon icon={faTimes} />
      </div>
    );
  }
}

export default ToolBox;
