/* eslint-disable no-shadow */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import Container from 'react-bootstrap/Container';
import hljs from 'highlight.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/an-old-hope.css';
import './CodeEditor.css';
import socket from '../../sockets';

// import PropTypes from 'prop-types';

const modules = {
  syntax: {
    highlight: text => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ font: [] }, { header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }, { color: [] }, { background: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    [{ script: 'sub' }, { script: 'super' }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'align',
  'color',
  'background',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'script',
];
class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      socket,
      sendData: {},
      modules: {},
      formats: [],
      theme: 'snow',
      placeholder: 'Let your thoughts flow off your mind. This is where your creativity begins...',
    }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ ...this.state, modules, formats });

    // Update text for every user connected to the ID
    socket.on('text-editor', data => {
      this.setState({ ...this.state, text: data });
    });
  }

  // Store text as soon as it changes
  handleChange(value) {
    this.setState({ text: value });

    const { text, sendData } = this.state;
    const id = sessionStorage.getItem('uniqueID');

    // Clears previous timeout
    if (id in sendData) {
      clearTimeout(sendData[id]);
    }

    // Sets new timeout with the Updated text
    sendData[id] = setTimeout(() => {
      // Pings all connnected users ecery 1.5 secs
      socket.emit('text-editor', { room: id, data: text });
    }, 1500);
  }

  render() {
    const { text, modules, formats, theme, placeholder } = this.state;
    return (
      <Container>
        <div className="code-editor">
          <ReactQuill
            value={text}
            onChange={this.handleChange}
            theme={theme}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
          />
        </div>
      </Container>
    );
  }
}

export default CodeEditor;
