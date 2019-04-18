import React from 'react';
import Container from 'react-bootstrap/Container';
import hljs from 'highlight.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/an-old-hope.css';
import './CodeEditor.css';
// import PropTypes from 'prop-types';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
    this.theme = 'snow';
    this.placeholder = 'Let your thoughts flow off your mind. This is where your creativity begins...';
  }

  // Store text as soon as it changes
  handleChange(value) {
    this.setState({ text: value });
    // var delta = quill.getContents();
    // console.log(this.state.text)
  }

  render() {
    const { text } = this.state;
    return (
      <Container>
        <div className="code-editor">
          <ReactQuill
            value={text}
            onChange={this.handleChange}
            theme={this.theme}
            modules={CodeEditor.modules}
            formats={CodeEditor.formats}
            placeholder={this.placeholder}
          />
        </div>
      </Container>
    );
  }
}

CodeEditor.modules = {
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

CodeEditor.formats = [
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

export default CodeEditor;
