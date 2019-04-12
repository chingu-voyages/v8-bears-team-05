import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './JoinModal.css';

const JoinModal = ({ joinModalOpen, toggleJoinModal }) => {
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
          <Form.Group className="join-modal-form">
            <Form.Label className="join-modal-title">Enter ID</Form.Label>
            <Form.Control type="text" placeholder="Enter ID here..." />

            <Button variant="primary" className="join-modal-button">
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
};

export default JoinModal;
