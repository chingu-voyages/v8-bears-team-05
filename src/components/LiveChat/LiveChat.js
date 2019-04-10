import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import './LiveChat.css';

const LiveChat = () => {
  return (
    <>
      <div className="chat-history" />
      <div className="chat">
        <InputGroup className="chat-inputgroup">
          <FormControl aria-describedby="chat-input" className="chat-input" placeholder="Type your message here ..." />
          <InputGroup.Append>
            <FontAwesomeIcon icon={faLocationArrow} className="send-message" />
          </InputGroup.Append>
        </InputGroup>
      </div>
    </>
  );
};

export default LiveChat;
