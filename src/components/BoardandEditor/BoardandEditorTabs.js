/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Tools } from 'react-sketch';
import { Col, Row } from 'react-bootstrap';
import io from 'socket.io-client';
import WhiteBoard from '../WhiteBoard/WhiteBoard';
import CodeEditor from '../CodeEditor/CodeEditor';

import ToolBox from '../ToolBox/ToolBox';

const socket = io('http://localhost:7000/boardandeditor', { transports: ['websocket', 'polling'] });

// Front end Data testing purposes...
// socket.on('timer', data => {
//   console.log(data);
// });

class BoardandEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'whiteboard',
      lineWidth: 4,
      lineColor: 'black',
      // fillColor: '#68CCCA',
      // backgroundColor: 'transparent',
      // shadowWidth: 0,
      // shadowOffset: 0,
      selectedTool: Tools.Pencil,
      enableRemoveSelected: false,
      // fillWithColor: false,
      // fillWithBackgroundColor: false,
      show: false,
      canUndo: false,
      canRedo: false,
      controlledSize: false,
      sketchWidth: 600,
      sketchHeight: 600,
      stretched: true,
      stretchedX: false,
      stretchedY: false,
      originX: 'left',
      originY: 'top',
      imageUrl: 'https://files.gamebanana.com/img/ico/sprays/4ea2f4dad8d6f.png',
      expandTools: false,
      expandControls: false,
      expandColors: false,
      expandBack: false,
      expandImages: false,
      expandControlled: false,
      text: 'a text, cool!',
      enableCopyPaste: false,
      sketchRef: null,
      mouseDown: false,
      storeData: [],
      modalShow: false,
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modalShow: !prevState.modalShow,
    }));
  };

  // handle color change
  onChangeColor = color => {
    this.setState({
      ...this.state,
      lineColor: color.hex,
    });
  };

  // handle width change
  onRangeChanged = value => {
    this.setState({
      ...this.state,
      lineWidth: value,
    });
  };

  // set the canvas reference after canvas is mounted
  setSketchRef = ref => {
    this.setState({
      ...this.state,
      sketchRef: ref,
    });
  };

  // handle drawing and font Tool selection
  onChangeTool = event => {
    if (event.target.getAttribute('value')) {
      this.setState({
        ...this.state,

        selectedTool: event.target.getAttribute('value'),
        enableRemoveSelected: event.target.value === Tools.Select,
        enableCopyPaste: event.target.value === Tools.Select,
      });
    }
  };

  // update state and undo redo status on sketch change
  onSketchChange = () => {
    const { canUndo, sketchRef, storeData } = this.state;
    const prev = canUndo;
    const now = sketchRef.canUndo();

    const drawings = sketchRef.toDataURL();
    if (!storeData.includes(drawings) && prev !== now) {
      this.setState({
        ...this.state,
        canUndo: now,
        storeData: [...storeData, drawings],
      });
      socket.emit('store-data', storeData);
    }
    if (!storeData.includes(drawings) && prev === now) {
      this.setState({
        storeData: [...storeData, drawings],
      });
      socket.emit('store-data', storeData);
    }
  };

  // function for undoing one change
  undo = () => {
    const { sketchRef, canUndo } = this.state;
    if (canUndo) {
      sketchRef.undo();

      this.setState({
        ...this.state,
        canUndo: sketchRef.canUndo(),
        canRedo: sketchRef.canRedo(),
      });
    }
  };

  // function for redoing the changes
  redo = () => {
    const { sketchRef, canRedo } = this.state;
    if (canRedo) {
      sketchRef.redo();
      this.setState({
        ...this.state,
        canUndo: sketchRef.canUndo(),
        canRedo: sketchRef.canRedo(),
      });
    }
  };

  // function for removing all changes
  clear = () => {
    const { sketchRef } = this.state;
    sketchRef.clear();
    // sketchRef.setBackgroundFromDataUrl('');
    this.setState({
      ...this.state,
      // controlledValue: null,
      // backgroundColor: 'transparent',
      // fillWithBackgroundColor: false,
      canUndo: sketchRef.canUndo(),
      canRedo: sketchRef.canRedo(),
    });
  };

  imageDrop = accepted => {
    if (accepted && accepted.length > 0) {
      const { sketchRef } = this.state;
      const sketch = sketchRef;
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          sketch.addImg(reader.result);
          this.setState({ modalShow: false });
        },
        false
      );
      reader.readAsDataURL(accepted[0]);
    }
  };

  setMouseDown = () => {
    this.setState(prevState => {
      return { ...prevState, mouseDown: !prevState.mouseDown };
    });
  };

  render() {
    const { key, lineWidth, lineColor, selectedTool, sketchRef, modalShow } = this.state;
    return (
      <Container id="board">
        <Row>
          <Col md={9}>
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={tabKey => this.setState({ key: tabKey })}>
              <Tab eventKey="whiteboard" title="Whiteboard">
                <WhiteBoard
                  lineWidth={lineWidth}
                  lineColor={lineColor}
                  tool={selectedTool}
                  sketchChange={this.onSketchChange}
                  loadSketch={this.setSketchRef}
                  setMouseDown={this.setMouseDown}
                  show={modalShow}
                  toggleModal={this.toggleModal}
                  imageDrop={this.imageDrop}
                />
              </Tab>
              <Tab eventKey="codeeditor" title="CodeEditor">
                <CodeEditor />
              </Tab>
            </Tabs>
          </Col>
          <Col md={3}>
            {key === 'whiteboard' ? (
              <ToolBox
                lineWidth={lineWidth}
                lineColor={lineColor}
                selectedTool={selectedTool}
                sketchRef={sketchRef}
                changeColor={this.onChangeColor}
                rangeChanged={this.onRangeChanged}
                changeTool={this.onChangeTool}
                sketchChange={this.onSketchChange}
                undo={this.undo}
                redo={this.redo}
                clear={this.clear}
                toggleModal={this.toggleModal}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default BoardandEditor;
