/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import './ChatHeader.css';

const ChatHeader = ({ toggleChat, unreadMessages, noOfUsers }) => {
  return (
    <div className="chat-header" onClick={toggleChat}>
      {unreadMessages > 0 && <span>{unreadMessages}</span>}
      <span>Message</span>
      {noOfUsers > 0 && <span>{noOfUsers} online</span>}
    </div>
  );
};

ChatHeader.propTypes = {
  toggleChat: PropTypes.func.isRequired,
  unreadMessages: PropTypes.number.isRequired,
  noOfUsers: PropTypes.number.isRequired,
};
export default ChatHeader;
