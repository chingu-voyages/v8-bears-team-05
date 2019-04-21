/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

const Message = ({ message, user, index }) => {
  return (
    <li key={index} className={`message ${user === message.user ? 'right' : 'left'}`}>
      {user !== message.user && <h5>{message.user}</h5>}
      {message.content}
    </li>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Message;
