/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './MeetingModal.css';

const MeetingModal = ({ hostModalOpen, toggleHostModal, uniqueID, createRoom }) => {
  return (
    <Modal
      show={hostModalOpen}
      onHide={toggleHostModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Host a meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="meeting-form">
            <Form.Label className="meeting-modal-title">Your ID</Form.Label>
            <Form.Control type="text" disabled value={uniqueID} />
            <Form.Text className="text-muted">Share this with people to invite them to meeting</Form.Text>
            <Button variant="primary" className="meeting-modal-button" onClick={createRoom}>
              Host
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

MeetingModal.propTypes = {
  hostModalOpen: PropTypes.bool.isRequired,
  uniqueID: PropTypes.string.isRequired,
  createRoom: PropTypes.func.isRequired,
  toggleHostModal: PropTypes.func.isRequired,
};

export default MeetingModal;
