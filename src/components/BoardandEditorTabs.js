import React from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import WhiteBoard from './WhiteBoard';
import CodeEditor from './CodeEditor';

class BoardandEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'whiteboard',
    };
  }

  render() {
    const { key } = this.state;
    return (
      <Container id="board">
        <Tabs id="controlled-tab-example" activeKey={key} onSelect={tabKey => this.setState({ key: tabKey })}>
          <Tab eventKey="whiteboard" title="Whtieboard">
            <WhiteBoard />
          </Tab>
          <Tab eventKey="codeeditor" title="CodeEditor">
            <CodeEditor />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
export default BoardandEditor;