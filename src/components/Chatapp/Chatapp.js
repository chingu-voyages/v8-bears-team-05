/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Draggable from 'react-draggable';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatBox from '../ChatBox/ChatBox';
import messageReceived from '../../assets/App Store Purchase Sound Effect.wav';
import './Chatapp.css';
import socket from '../../sockets';

class Chatapp extends Component {
  state = {
    messages: [],
    user: sessionStorage.getItem('user') || '',
    text: '',
    chatOpen: false,
    noOfUsers: 1,
    unreadMessages: 0,
  };

  componentDidMount() {
    // Loads up prev chat history for the new user
    socket.on('join-chat', res => {
      this.setState({
        ...this.state,
        messages: res.messages,
        noOfUsers: res.online,
      });

      // Set Unread count
      const { chatOpen } = this.state;
      if (!chatOpen) {
        this.setState({
          ...this.state,
          unreadMessages: res.messages.length,
        });
      }
    });

    // Updates number of online users
    socket.on('online-count', count => {
      this.setState({
        ...this.state,
        noOfUsers: count,
      });
    });

    // Receives new message from the connected users
    socket.on('chat-history', newMessage => {
      const { messages } = this.state;
      this.setState({
        ...this.state,
        messages: [...messages, newMessage],
      });

      // Add Unread count
      const { chatOpen, unreadMessages } = this.state;
      if (!chatOpen) {
        this.setState({
          ...this.state,
          unreadMessages: unreadMessages + 1,
        });
      }
      const { scrollHeight } = this.chatlist;
      const height = this.chatlist.clientHeight;
      const maxScrollTop = scrollHeight - height;

      const messageReceivedAudio = new Audio(messageReceived);
      messageReceivedAudio.volume = 0.3;
      messageReceivedAudio.play();
      // console.log(this.chatlist.scrollTop, maxScrollTop);
      if (maxScrollTop - this.chatlist.scrollTop <= 250) {
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      }
    });
  }

  addUser = () => {
    // add user
    let { text } = this.state;

    // Capitalize initials
    text = text.charAt(0).toUpperCase() + text.slice(1);
    this.setState({ user: text, text: '' });

    sessionStorage.setItem('user', text);

    const id = sessionStorage.getItem('uniqueID');
    socket.emit('chat-notify', { room: id, data: text });
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

      const id = sessionStorage.getItem('uniqueID');
      socket.emit('chat-history', { room: id, data: { user, content: text } });
      setTimeout(() => {
        this.scrollToBottom();
      }, 10);
    }
  };

  setText = e => {
    this.setState({ text: e.target.value });
  };

  toggleChat = () => {
    // Set Unread count to 0
    const { chatOpen } = this.state;
    if (!chatOpen) {
      this.setState({
        ...this.state,
        unreadMessages: 0,
      });
      // Sets Focus to Message Input
      setTimeout(() => {
        document.querySelector('.message-input').focus();
      }, 100);
    }

    this.setState(prevState => ({ chatOpen: !prevState.chatOpen }));
  };

  handleKeyDown = e => {
    const { user } = this.state;
    if (e.which === 13) {
      user ? this.sendMessage() : this.addUser();
    }
  };

  scrollToBottom = () => {
    const { scrollHeight } = this.chatlist;
    const height = this.chatlist.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.chatlist.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  render() {
    const { chatOpen, user, messages, noOfUsers, unreadMessages, text } = this.state;
    return (
      <Draggable axis="x" bounds={{ left: -910, right: 30 }} disabled={chatOpen}>
        <div className="chat-app">
          <ChatHeader
            toggleChat={this.toggleChat}
            noOfUsers={noOfUsers}
            unreadMessages={unreadMessages}
            chatOpen={chatOpen}
          />
          <div
            className={chatOpen ? 'chat-open chat-container' : 'chat-close chat-container'}
            onKeyDown={this.handleKeyDown}
          >
            <ChatBox
              user={user}
              messages={messages}
              chatListRef={el => {
                this.chatlist = el;
              }}
            />
            <InputGroup className="mb-2">
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
      </Draggable>
    );
  }
}

export default Chatapp;
