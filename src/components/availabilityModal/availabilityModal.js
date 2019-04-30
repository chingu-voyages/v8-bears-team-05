/* eslint-disable react/require-default-props */
import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AvailabilityModal = ({ availabilityModalOpen, toggleAvailabilityModal }) => {
  return (
    <Modal show={availabilityModalOpen} onHide={toggleAvailabilityModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <font size="4">Not Available on Mobile</font>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <font size="3">
          This Feature is only available on our Desktop Version as of now...{' '}
          <span role="img" aria-labelledby="sad-emoji">
            😢
          </span>
        </font>
      </Modal.Body>
    </Modal>
  );
};

AvailabilityModal.propTypes = {
  availabilityModalOpen: PropTypes.bool.isRequired,
  toggleAvailabilityModal: PropTypes.func.isRequired,
};

export default AvailabilityModal;
