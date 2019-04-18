import React from 'react';
import Container from 'react-bootstrap/Container';
import './highlight';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import 'highlight.js/styles/tomorrow-night-bright.css';
import './CodeEditor.css';
// import PropTypes from 'prop-types';

// console.log(window.hljs.listLanguages())

// Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
window.hljs.initHighlighting();

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
    this.theme = 'snow';
  }

  handleChange(value) {
    this.setState({ text: value });
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
            // bounds={'.app'}
            // placeholder={this.props.placeholder}
          />
        </div>
      </Container>
    );
  }
}

CodeEditor.modules = {
  syntax: true,
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

// CodeEditor.propTypes = {
//   placeholder: PropTypes.string,
// };

// ReactDOM.render(
//   <CodeEditor placeholder={'Write something...'}/>,
//   document.querySelector('.app')
// )

export default CodeEditor;
