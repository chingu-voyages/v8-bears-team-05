/* eslint-disable react/require-default-props */
import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AvailabilityModal = ({ availabilityModalOpen, toggleAvailabilityModal }) => {
  return (
    <Modal show={availabilityModalOpen} onHide={toggleAvailabilityModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Not Available</Modal.Title>
      </Modal.Header>
      <Modal.Body>This Feature is only avalaible in desktop version!!</Modal.Body>
    </Modal>
  );
};

AvailabilityModal.propTypes = {
  availabilityModalOpen: PropTypes.bool.isRequired,
  toggleAvailabilityModal: PropTypes.func.isRequired,
};

export default AvailabilityModal;
