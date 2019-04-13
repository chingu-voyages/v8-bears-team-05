/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Tools } from 'react-sketch';
import { Col, Row } from 'react-bootstrap';
import io from 'socket.io-client';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import WhiteBoard from '../WhiteBoard/WhiteBoard';
import CodeEditor from '../CodeEditor/CodeEditor';
import { BoardContext } from '../../contexts';
import ToolBox from '../ToolBox/ToolBox';
import JoinModal from '../JoinModal/JoinModal';
import MeetingModal from '../MeetingModal/MeetingModal';

const socket = io('http://localhost:7000/boardandeditor', { transports: ['websocket', 'polling'] });

// Front end Data testing purposes...
// socket.on('timer', data => {
//   console.log(data[data.length - 1]);
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
      controlledValue: null,
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
      socket,
      modalShow: false,
      addTextOpen: false,
      uniqueID: '',
    };
  }

  // Listening for drawing on canvas
  componentDidMount() {
    this.genUniqueID();

    socket.on('draw-line', lineData => {
      const { storeData, canUndo, sketchRef } = this.state;
      const prev = canUndo;
      const now = sketchRef.canUndo();

      if (!storeData.includes(lineData)) {
        this.setState({
          controlledValue: lineData,
        });

        this.setState({
          ...this.state,
          storeData: [...storeData, lineData],
        });

        if (prev !== now) {
          this.setState({
            ...this.state,
            canUndo: now,
          });
        }
      }
    });

    // undo canvas for all users connected to the network
    socket.on('undo-canvas', () => {
      const { sketchRef, canUndo } = this.state;

      if (canUndo) {
        sketchRef.undo();

        this.setState({
          ...this.state,
          canUndo: sketchRef.canUndo(),
          canRedo: sketchRef.canRedo(),
        });
      }
    });

    // redo canvas for all users connected to the network
    socket.on('redo-canvas', () => {
      const { sketchRef, canRedo } = this.state;
      if (canRedo) {
        sketchRef.redo();
        this.setState({
          ...this.state,
          canUndo: sketchRef.canUndo(),
          canRedo: sketchRef.canRedo(),
        });
      }
    });

    // Clear canvas
    socket.on('clear-canvas', () => {
      const { sketchRef } = this.state;
      sketchRef.clear();
      // sketchRef.setBackgroundFromDataUrl('');
      this.setState({
        ...this.state,
        controlledValue: null,
        // backgroundColor: 'transparent',
        // fillWithBackgroundColor: false,
        canUndo: sketchRef.canUndo(),
        canRedo: sketchRef.canRedo(),
      });
    });

    // This socket is triggered on error
    socket.on('err', message => {
      console.log(message);
    });
  }

  // Add a comment here @Iliyas
  toggleModal = () => {
    this.setState(prevState => ({
      modalShow: !prevState.modalShow,
    }));
  };

  // Get an id for unique teams
  genUniqueID = () => {
    const { uniqueID } = this.state;

    // Check for an existing id
    if (uniqueID === '') {
      // Generate a 6 char unique ID to create a unique team
      // const ids = ['rishabh', 'keshav'];
      // const id = ids[Math.floor(Math.random() * ids.length)];
      const id = nanoid(6);
      // console.log(id);

      // set id state to connect to the socket
      this.setState({
        uniqueID: id,
      });
    }
  };

  // create room on host button trigger
  createRoom = () => {
    const { uniqueID } = this.state;
    const { toggleHostModal } = this.props;

    // Close the Modal
    toggleHostModal();

    // socket emit to join the room
    socket.emit('create-room', uniqueID);
  };

  // join room on host button trigger
  joinRoom = () => {
    const { joinID, toggleJoinModal } = this.props;
    const id = joinID;
    // console.log(this.props.joinID);

    // set id state to connect to the socket
    this.setState({
      uniqueID: id,
    });

    // Close the Modal
    toggleJoinModal();

    // socket emit to join the room
    socket.emit('join-room', id);
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
      const { addTextOpen } = this.state;

      if (addTextOpen === true) {
        this.setState({
          ...this.state,
          addTextOpen: !addTextOpen,
          selectedTool: event.target.getAttribute('value'),
          enableRemoveSelected: event.target.value === Tools.Select,
          enableCopyPaste: event.target.value === Tools.Select,
        });
      } else {
        this.setState({
          ...this.state,

          selectedTool: event.target.getAttribute('value'),
          enableRemoveSelected: event.target.value === Tools.Select,
          enableCopyPaste: event.target.value === Tools.Select,
        });
      }
    }
  };

  // update state and undo redo status on sketch change
  onSketchChange = () => {
    const { canUndo, sketchRef, storeData, uniqueID } = this.state;
    const prev = canUndo;
    const now = sketchRef.canUndo();

    // const drawings = sketchRef.toDataURL();
    const drawingsJSON = JSON.stringify(sketchRef.toJSON());

    if (!storeData.includes(drawingsJSON) && prev !== now) {
      // console.log(storeData)
      // console.log(drawingsJSON.objects);
      this.setState({
        ...this.state,
        canUndo: now,
        storeData: [...storeData, drawingsJSON],
      });
      socket.emit('store-data', { room: uniqueID, data: drawingsJSON });
    } else if (!storeData.includes(drawingsJSON) && prev === now) {
      this.setState({
        ...this.state,
        storeData: [...storeData, drawingsJSON],
      });
      socket.emit('store-data', { room: uniqueID, data: drawingsJSON });
    }
  };

  // function for undoing one change
  undo = () => {
    const { sketchRef, canUndo, uniqueID } = this.state;

    if (canUndo) {
      sketchRef.undo();

      this.setState({
        ...this.state,
        canUndo: sketchRef.canUndo(),
        canRedo: sketchRef.canRedo(),
      });

      socket.emit('undo-canvas', { room: uniqueID });
    }
  };

  // function for redoing the changes
  redo = () => {
    const { sketchRef, canRedo, uniqueID } = this.state;
    if (canRedo) {
      sketchRef.redo();
      this.setState({
        ...this.state,
        canUndo: sketchRef.canUndo(),
        canRedo: sketchRef.canRedo(),
      });
      socket.emit('redo-canvas', { room: uniqueID });
    }
  };

  // function for removing all changes
  clear = () => {
    const { sketchRef, uniqueID } = this.state;
    sketchRef.clear();
    // sketchRef.setBackgroundFromDataUrl('');
    this.setState({
      ...this.state,
      controlledValue: null,
      // backgroundColor: 'transparent',
      // fillWithBackgroundColor: false,
      canUndo: sketchRef.canUndo(),
      canRedo: sketchRef.canRedo(),
    });

    socket.emit('clear-canvas', { room: uniqueID });
  };

  removeSelected = () => {
    const { sketchRef } = this.state;
    sketchRef.removeSelected();
  };

  imageDrop = accepted => {
    if (accepted && accepted.length > 0 && accepted[0].size / 1048576 < 2.5) {
      const { sketchRef } = this.state;
      const sketch = sketchRef;
      const reader = new FileReader();
      // console.log(accepted[0].size / 1048576);
      reader.addEventListener(
        'load',
        () => {
          sketch.addImg(reader.result, { scale: 0.3 });
          this.setState({ modalShow: false, selectedTool: Tools.Select });
        },
        false
      );
      reader.readAsDataURL(accepted[0]);
    }
  };

  setText = e => {
    this.setState({
      ...this.state,
      text: e.target.value,
    });
  };

  clickAddText = e => {
    const { addTextOpen, selectedTool } = this.state;
    if (selectedTool !== 'text') {
      this.setState({
        ...this.state,
        addTextOpen: !addTextOpen,
        selectedTool: e.target.getAttribute('value'),
      });
    }
  };

  addText = () => {
    const { sketchRef, text } = this.state;
    this.setState({ selectedTool: Tools.Select, addTextOpen: false });
    sketchRef.addText(text);
  };

  setMouseDown = () => {
    this.setState(prevState => {
      return { ...prevState, mouseDown: !prevState.mouseDown };
    });
  };

  render() {
    const {
      key,
      lineWidth,
      lineColor,
      selectedTool,
      sketchRef,
      controlledValue,
      modalShow,
      addTextOpen,
      uniqueID,
    } = this.state;
    const { hostModalOpen, joinModalOpen, toggleHostModal, toggleJoinModal, changeJoinID } = this.props;
    return (
      <>
        <MeetingModal
          hostModalOpen={hostModalOpen}
          toggleHostModal={toggleHostModal}
          uniqueID={uniqueID}
          createRoom={this.createRoom}
        />
        <JoinModal
          joinModalOpen={joinModalOpen}
          toggleJoinModal={toggleJoinModal}
          joinRoom={this.joinRoom}
          changeJoinID={changeJoinID}
        />
        <Container id="board">
          <Row>
            <Col md={9}>
              <Tabs id="controlled-tab-example" activeKey={key} onSelect={tabKey => this.setState({ key: tabKey })}>
                <Tab eventKey="whiteboard" title="Whiteboard">
                  <BoardContext.Provider
                    value={{ show: modalShow, toggleModal: this.toggleModal, imageDrop: this.imageDrop }}
                  >
                    <WhiteBoard
                      lineWidth={lineWidth}
                      lineColor={lineColor}
                      tool={selectedTool}
                      sketchChange={this.onSketchChange}
                      loadSketch={this.setSketchRef}
                      setMouseDown={this.setMouseDown}
                      controlledValue={controlledValue}
                    />
                  </BoardContext.Provider>
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
                  removeSelected={this.removeSelected}
                  clickAddText={this.clickAddText}
                  addTextOpen={addTextOpen}
                  setText={this.setText}
                  addText={this.addText}
                />
              ) : null}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default withRouter(BoardandEditor);

BoardandEditor.propTypes = {
  hostModalOpen: PropTypes.bool.isRequired,
  joinModalOpen: PropTypes.bool.isRequired,
  changeJoinID: PropTypes.func.isRequired,
  joinID: PropTypes.string.isRequired,
  toggleHostModal: PropTypes.func.isRequired,
  toggleJoinModal: PropTypes.func.isRequired,
};
