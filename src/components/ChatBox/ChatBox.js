/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import enterProfile from '../../assets/undraw_profile_data_mk6k.svg';
import Message from '../Message/Message';
import './ChatBox.css';

const ChatBox = ({ messages, user }) => {
  return (
    <div className="chat-box">
      {user ? (
        messages.map(message => <Message message={message} user={user} />)
      ) : (
        <div className="add-user-prompt">
          <div className="add-user-border">
            <img src={enterProfile} alt="" />
            <span>Add your username to continue...</span>
          </div>
        </div>
      )}
    </div>
  );
};

ChatBox.propTypes = {
  messages: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
};

export default ChatBox;
