/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Tools } from 'react-sketch';
import { Col, Row } from 'react-bootstrap';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { saveAs } from 'file-saver';

import socket from '../../sockets';
import Chatapp from '../Chatapp/Chatapp';
import WhiteBoard from '../WhiteBoard/WhiteBoard';
import CodeEditor from '../CodeEditor/CodeEditor';
import { BoardContext } from '../../contexts';
import ToolBox from '../ToolBox/ToolBox';
import JoinModal from '../JoinModal/JoinModal';
import MeetingModal from '../MeetingModal/MeetingModal';
import AuthenticateModal from '../authenticateModal/authenticateModal';
import AvailabilityModal from '../availabilityModal/availabilityModal';

class BoardandEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'whiteboard',
      lineWidth: 4,
      lineColor: 'rgba(0, 0, 0, 100)',
      fillColor: 'rgba(245, 229, 27, 100)',
      eraserColor: null,
      // fillColor: '#68CCCA',
      backgroundColor: '#fff',
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
      expandTools: false,
      expandControls: false,
      expandColors: false,
      expandBack: false,
      expandImages: false,
      expandControlled: false,
      text: 'Enter your text here...',
      sketchRef: null,
      mouseDown: false,
      storeData: [],
      socket,
      modalShow: false,
      addTextOpen: false,
      uniqueID: '',
      displayLineColorPicker: false,
      displayFillColorPicker: false,
      availabilityModalOpen: false,
      copied: false,
    };
    this.notificationDOMRef = React.createRef();
  }

  // Listening for drawing on canvas
  componentDidMount() {
    this.genUniqueID();

    // Set scroll to the top
    window.scrollTo(0, 0);

    // Set refresh to sessionStorage before reload
    window.onbeforeunload = () => {
      sessionStorage.setItem('refresh', true);
    };

    // On succesful user join
    socket.on('join-success', id => {
      const { joinModalOpen, toggleJoinModal, setMessage } = this.props;

      // set id state to connect to the socket
      this.setState({
        uniqueID: id,
      });

      // Save unique id to sessionStorage
      sessionStorage.setItem('uniqueID', id);

      // Close the Modal
      if (joinModalOpen && sessionStorage.getItem('join-modal') !== 'true') {
        toggleJoinModal();

        // Show notification
        setMessage(`Yippee! You are now connected to ID: ${id}`, 'success');
      } else {
        sessionStorage.setItem('join-modal', false);
      }
    });

    // Draws drawings
    socket.on('draw-line', lineData => {
      const { storeData } = this.state;

      if (!storeData.includes(lineData) && lineData !== null) {
        this.setState({
          controlledValue: lineData,
        });

        this.setState({
          ...this.state,
          storeData: [...storeData, lineData],
        });

        const { canUndo, sketchRef } = this.state;

        const prev = canUndo;
        const now = sketchRef.canUndo();
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
        storeData: [],
        backgroundColor: '#fff',
        // fillWithBackgroundColor: false,
        canUndo: sketchRef.canUndo(),
        canRedo: sketchRef.canRedo(),
      });
    });

    // This socket sends notfication to the users
    socket.on('notify', res => {
      const { setMessage, joinModalOpen, hostModalOpen } = this.props;

      // Stop trigger when join or host Modal open
      if (res.toggle === false && (joinModalOpen || hostModalOpen)) {
        sessionStorage.setItem('join-modal', false);
        return;
      }
      setMessage(res.message, res.type);
    });
    const { toggleNavbar, expanded } = this.props;
    expanded && toggleNavbar();
  }

  // Show/Hide image drop modal
  toggleModal = () => {
    this.setState(prevState => ({
      modalShow: !prevState.modalShow,
    }));
  };

  // Get an id for unique teams
  genUniqueID = () => {
    const { uniqueID } = this.state;
    const { toggleHostModal, toggleJoinModal } = this.props;

    // Check for an existing id
    if (uniqueID === '') {
      // Generate a 6 char unique ID to create a unique team
      // const ids = ['rishabh', 'keshav'];
      // const id = ids[Math.floor(Math.random() * ids.length)];

      const prevID = sessionStorage.getItem('uniqueID');
      const id = prevID || nanoid(6);

      // Save unique id to sessionStorage
      sessionStorage.setItem('uniqueID', id);

      // set id state to connect to the socket
      this.setState({
        uniqueID: id,
      });

      const refresh = sessionStorage.getItem('refresh');

      if (refresh === 'true') {
        // socket emit to join the room
        socket.emit('join-room', id);
      } else if (prevID !== id) {
        // socket emit to create the room
        socket.emit('create-room', id);
      } else {
        socket.emit('join-room', id);
      }
      sessionStorage.setItem('refresh', false);
    }

    // Checks if the navbar host or join modals were clicked
    if (sessionStorage.getItem('join-modal') === 'true') {
      // Session storage set to false in create-room notify and join-room success to prevent closing the modal automatically accompanied with not required notification.
      toggleJoinModal();
    } else if (sessionStorage.getItem('host-modal') === 'true') {
      toggleHostModal();
      sessionStorage.setItem('host-modal', false);
    }
  };

  // create room on host button trigger
  createRoom = () => {
    const { uniqueID } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { toggleHostModal } = this.props;

    // Close the Modal
    toggleHostModal();

    // socket emit to join the room
    socket.emit('create-room', uniqueID);
  };

  // join room on host button trigger
  joinRoom = () => {
    // eslint-disable-next-line no-unused-vars
    const { joinID, setMessage } = this.props;
    const id = joinID;
    const prevID = sessionStorage.getItem('uniqueID');

    if (prevID !== id) {
      // socket emit to join the room
      socket.emit('join-room', id);
    } else {
      setMessage(`You are already connected to this ID: ${id}.`, 'danger');
    }
  };

  handleLinePickerClick = () => {
    this.setState(prevState => ({ ...this.state, displayLineColorPicker: !prevState.displayLineColorPicker }));
  };

  // handle color change
  handleLineColorChange = color => {
    this.setState({
      ...this.state,
      lineColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
    });
  };

  handleFillPickerClick = () => {
    this.setState(prevState => ({ ...this.state, displayFillColorPicker: !prevState.displayFillColorPicker }));
  };

  // handle fill color change
  handleFillColorChange = color => {
    this.setState({
      ...this.state,
      fillColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
    });

    const { sketchRef, fillColor } = this.state;

    const activeObject = sketchRef._fc.getActiveObject();
    if (activeObject !== null && activeObject !== undefined) {
      activeObject.set('fill', fillColor);
      sketchRef._fc.renderAll();
    }
  };

  // ZoomIn
  zoomIn = () => {
    const { sketchRef } = this.state;
    sketchRef.zoom(1.25);
  };

  // zoom out
  zoomOut = () => {
    const { sketchRef } = this.state;
    sketchRef.zoom(0.8);
  };

  downloadImage = () => {
    const { sketchRef, storeData } = this.state;
    const { setMessage } = this.props;

    if (storeData.length !== 0) {
      // console.log(sketchRef.toDataURL());
      saveAs(sketchRef.toDataURL(), 'doodlelive.png');
    } else {
      setMessage('Doodle before you download this image.', 'warning');
    }
  };

  copyPaste = () => {
    const { sketchRef, enableCopyPaste } = this.state;

    const activeObject = sketchRef._fc.getActiveObject();
    if (activeObject !== null && activeObject !== undefined && enableCopyPaste) {
      sketchRef.copy();
      sketchRef.paste();
    }
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

  highlightTool = () => {
    this.setState({ ...this.state, selectedTool: 'highlighter' });
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
          enableRemoveSelected: event.target.getAttribute('value') === Tools.Select,
          enableCopyPaste: event.target.getAttribute('value') === Tools.Select,
        });
      } else {
        if (event.target.getAttribute('value') === 'pencil') {
          this.setState({ ...this.state, lineWidth: 4 });
        }
        this.setState({
          ...this.state,

          selectedTool: event.target.getAttribute('value'),
          enableRemoveSelected: event.target.getAttribute('value') === Tools.Select,
          enableCopyPaste: event.target.getAttribute('value') === Tools.Select,
        });
      }
    }
  };

  onEraserTool = () => {
    this.setState({
      ...this.state,
      selectedTool: 'eraser',
    });
  };

  // update state and undo redo status on sketch change
  onSketchChange = () => {
    const { canUndo, sketchRef, storeData, uniqueID, selectedTool } = this.state;
    const prev = canUndo;
    const now = sketchRef.canUndo();

    // const drawings = sketchRef.toDataURL();
    const size = sketchRef._fc.size();
    let drawingsJSON = JSON.stringify(
      sketchRef._fc.toJSON([
        'lockMovementX',
        'lockMovementY',
        'lockRotationX',
        'lockRotationY',
        'lockScalingX',
        'lockScalingY',
        'hasControls',
        'hasBorders',
      ])
    );

    if (!storeData.includes(drawingsJSON) && JSON.parse(drawingsJSON).objects.length !== 0) {
      // Lock Eraser size & position
      if (selectedTool === 'eraser' || selectedTool === 'highlighter') {
        sketchRef._fc.item(size - 1).lockMovementX = true;
        sketchRef._fc.item(size - 1).lockMovementY = true;
        sketchRef._fc.item(size - 1).lockRotationX = true;
        sketchRef._fc.item(size - 1).lockRotationY = true;
        sketchRef._fc.item(size - 1).lockScalingX = true;
        sketchRef._fc.item(size - 1).lockScalingY = true;
        sketchRef._fc.item(size - 1).hasControls = false;
        sketchRef._fc.item(size - 1).hasBorders = false;
      } else {
        sketchRef._fc.item(size - 1).lockMovementX = false;
        sketchRef._fc.item(size - 1).lockMovementY = false;
        sketchRef._fc.item(size - 1).lockRotationX = false;
        sketchRef._fc.item(size - 1).lockRotationY = false;
        sketchRef._fc.item(size - 1).lockScalingX = false;
        sketchRef._fc.item(size - 1).lockScalingY = false;
        sketchRef._fc.item(size - 1).hasControls = true;
        sketchRef._fc.item(size - 1).hasBorders = true;
      }

      drawingsJSON = JSON.stringify(
        sketchRef._fc.toJSON([
          'lockMovementX',
          'lockMovementY',
          'lockRotationX',
          'lockRotationY',
          'lockScalingX',
          'lockScalingY',
          'hasControls',
          'hasBorders',
        ])
      );

      this.setState({
        ...this.state,
        storeData: [...storeData, drawingsJSON],
        controlledValue: drawingsJSON,
      });

      // Set Undo state
      if (prev !== now) {
        this.setState({
          ...this.state,
          canUndo: now,
        });
      }

      // Fix Shapes dragging issues
      if (selectedTool === Tools.Rectangle || selectedTool === Tools.Line || selectedTool === Tools.Circle) {
        this.setState({ selectedTool: Tools.Select });
        setTimeout(() => {
          this.setState({ selectedTool });
        }, 100);
      }

      // Send draw data to the server
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
    this.setState(
      {
        controlledValue: null,
        storeData: [],
        backgroundColor: 'transparent',
        // fillWithBackgroundColor: false,
        canUndo: sketchRef.canUndo(),
        canRedo: sketchRef.canRedo(),
      },
      () => {
        // Resets the canvas background
        this.setState({
          backgroundColor: '#fff',
        });
      }
    );

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

    // Sets Focus to Input Text
    setTimeout(() => {
      document.querySelector('.input-text').focus();
    }, 100);
  };

  toggleAvailabilityModal = () => {
    this.setState(prevState => ({
      availabilityModalOpen: !prevState.availabilityModalOpen,
    }));
  };

  addText = () => {
    const { sketchRef, text } = this.state;
    this.setState({ selectedTool: Tools.Select, addTextOpen: false });
    sketchRef.addText(text);
  };

  handleKeyEnter = e => {
    if (e.which === 13) {
      e.preventDefault();
      this.addText();
    }
  };

  handleKeyDown = e => {
    if (e.which === 13) {
      e.preventDefault();
      this.joinRoom();
    }
  };

  onTabChange = tabKey => {
    // Detect mobiles and tablets
    const detectmob = () => {
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        // navigator.userAgent.match(/iPhone/i) ||
        // navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        return true;
      }

      return false;
    };

    // if (detectmob() && tabKey === 'codeeditor') {
    //   return this.toggleAvailabilityModal();
    // }
    if (tabKey === 'whiteboard' && detectmob()) {
      window.location.reload();
    }
    return this.setState({ key: tabKey });
  };

  copyUniqueId = () => {
    const { setMessage } = this.props;
    setMessage('Copied to Clipboard!', 'success');
    this.setState({ copied: true });
  };

  render() {
    const {
      key,
      lineWidth,
      lineColor,
      fillColor,
      backgroundColor,
      eraserColor,
      selectedTool,
      sketchRef,
      controlledValue,
      modalShow,
      addTextOpen,
      uniqueID,
      displayLineColorPicker,
      displayFillColorPicker,
      availabilityModalOpen,
    } = this.state;
    const {
      hostModalOpen,
      joinModalOpen,
      toggleHostModal,
      toggleJoinModal,
      changeJoinID,
      setMessage,
      authenticateModalOpen,
      typeofauthentication,
      toggleAuthenticateModal,
    } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <MeetingModal
          hostModalOpen={hostModalOpen}
          toggleHostModal={toggleHostModal}
          uniqueID={uniqueID}
          createRoom={this.createRoom}
          copyToClipboard={this.copyUniqueId}
        />
        <JoinModal
          joinModalOpen={joinModalOpen}
          toggleJoinModal={toggleJoinModal}
          joinRoom={this.joinRoom}
          changeJoinID={changeJoinID}
          handleKeyDown={this.handleKeyDown}
        />
        <AuthenticateModal
          authenticateModalOpen={authenticateModalOpen}
          toggleAuthenticateModal={toggleAuthenticateModal}
          typeofauthentication={typeofauthentication}
        />
        <AvailabilityModal
          availabilityModalOpen={availabilityModalOpen}
          toggleAvailabilityModal={this.toggleAvailabilityModal}
        />
        <Container id="board">
          <Row>
            <Col md={9}>
              <Tabs id="controlled-tab-example" activeKey={key} onSelect={this.onTabChange}>
                <Tab eventKey="whiteboard" title="Whiteboard">
                  <BoardContext.Provider
                    value={{ show: modalShow, toggleModal: this.toggleModal, imageDrop: this.imageDrop }}
                  >
                    <WhiteBoard
                      lineWidth={lineWidth}
                      lineColor={lineColor}
                      fillColor={fillColor}
                      backgroundColor={backgroundColor}
                      eraserColor={eraserColor}
                      tool={selectedTool}
                      sketchChange={this.onSketchChange}
                      loadSketch={this.setSketchRef}
                      controlledValue={controlledValue}
                      saveImage={this.downloadImage}
                    />
                  </BoardContext.Provider>
                </Tab>
                <Tab eventKey="codeeditor" title="TextEditor">
                  <CodeEditor setMessage={setMessage} />
                </Tab>
              </Tabs>
            </Col>
            <Col md={3}>
              {key === 'whiteboard' ? (
                <ToolBox
                  lineWidth={lineWidth}
                  lineColor={lineColor}
                  fillColor={fillColor}
                  selectedTool={selectedTool}
                  sketchRef={sketchRef}
                  handleLineColorChange={this.handleLineColorChange}
                  handleFillColorChange={this.handleFillColorChange}
                  rangeChanged={this.onRangeChanged}
                  changeTool={this.onChangeTool}
                  eraserTool={this.onEraserTool}
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
                  zoomIn={this.zoomIn}
                  zoomOut={this.zoomOut}
                  highlightTool={this.highlightTool}
                  displayLineColorPicker={displayLineColorPicker}
                  handleLinePickerClick={this.handleLinePickerClick}
                  displayFillColorPicker={displayFillColorPicker}
                  handleFillPickerClick={this.handleFillPickerClick}
                  copyPaste={this.copyPaste}
                  handleKeyEnter={this.handleKeyEnter}
                />
              ) : null}

              <Chatapp />
            </Col>
          </Row>
        </Container>
      </div>
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
  setMessage: PropTypes.func.isRequired,
  authenticateModalOpen: PropTypes.bool.isRequired,
  toggleAuthenticateModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  typeofauthentication: PropTypes.string,
  toggleNavbar: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};
