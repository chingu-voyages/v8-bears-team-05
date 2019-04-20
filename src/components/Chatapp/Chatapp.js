/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatBox from '../ChatBox/ChatBox';
import './Chatapp.css';

class Chatapp extends Component {
  state = {
    messages: [],
    user: '',
    text: '',
    chatOpen: false,
    noOfUsers: 0,
    unreadMessages: 0,
  };

  addUser = () => {
    // add user
    const { text } = this.state;
    this.setState({ user: text, text: '' });
  };

  sendMessage = () => {
    // send message
    const { text, messages, user } = this.state;
    if (text) {
      this.setState({
        ...this.state,
        messages: [...messages, { user, content: text }],
        text: '',
      });
    }
  };

  setText = e => {
    this.setState({ text: e.target.value });
  };

  toggleChat = () => {
    this.setState(prevState => ({ chatOpen: !prevState.chatOpen }));
  };

  render() {
    const { chatOpen, user, messages, noOfUsers, unreadMessages, text } = this.state;
    return (
      <div className="chat-app">
        <ChatHeader
          toggleChat={this.toggleChat}
          noOfUsers={noOfUsers}
          unreadMessages={unreadMessages}
          chatOpen={chatOpen}
        />
        <div
          style={chatOpen ? { display: 'block' } : { display: 'none' }}
          className="chat-container"
          onKeyDown={this.handleKeyDown}
        >
          <ChatBox user={user} messages={messages} />
          <InputGroup className="mb-1">
            <FormControl
              className="message-input"
              placeholder="send message..."
              onChange={this.setText}
              aria-label="Username"
              aria-describedby="send message"
              value={text}
              // eslint-disable-next-line no-return-assign
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={user ? this.sendMessage : this.addUser}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    );
  }
}

export default Chatapp;
