import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './JoinModal.css';
// import { join } from 'path';

const JoinModal = ({ joinModalOpen, toggleJoinModal, joinRoom, changeJoinID, handleKeyDown }) => {
  return (
    <Modal
      show={joinModalOpen}
      onHide={toggleJoinModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Join a meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="join-modal-form" onKeyDown={handleKeyDown}>
            <Form.Label className="join-modal-title">Enter ID</Form.Label>
            <Form.Control type="text" placeholder="Enter ID here..." onChange={e => changeJoinID(e)} />

            <Button variant="primary" className="join-modal-button" onClick={joinRoom}>
              Join
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

JoinModal.propTypes = {
  joinModalOpen: PropTypes.bool.isRequired,
  toggleJoinModal: PropTypes.func.isRequired,
  joinRoom: PropTypes.func.isRequired,
  changeJoinID: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

export default JoinModal;
