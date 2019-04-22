/* eslint-disable no-return-assign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import enterProfile from '../../assets/undraw_profile_data_mk6k.svg';
import Message from '../Message/Message';
import './ChatBox.css';

class ChatBox extends Component {
  render() {
    const { messages, user, chatListRef } = this.props;
    return (
      <div className="chat-box" ref={chatListRef}>
        {user ? (
          messages.map((message, index) => <Message message={message} user={user} index={index} key={index} />)
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
  }
}

ChatBox.propTypes = {
  messages: PropTypes.array.isRequired,
  chatListRef: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
};

export default ChatBox;
