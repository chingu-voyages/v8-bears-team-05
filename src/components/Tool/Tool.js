/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
// import { Tools } from 'react-sketch';

import './Tool.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tool = ({ iconName, selectTool, tool, selectedTool }) => {
  let classes = ['Icon'];
  if (selectedTool === tool) {
    classes = [...classes, 'active-tool'];
  }
  return (
    <div>
      <div className={classes.join(' ')}>
        <div className="Icon-overlay" onClick={e => selectTool(e)} value={tool} />
        <FontAwesomeIcon icon={iconName} />
      </div>
    </div>
  );
};

export default Tool;
Tool.defaultProps = {
  tool: undefined,
};
Tool.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  iconName: PropTypes.object.isRequired,
  selectTool: PropTypes.func.isRequired,
  tool: PropTypes.node,
  selectedTool: PropTypes.node.isRequired,
};
