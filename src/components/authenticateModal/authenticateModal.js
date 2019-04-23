/* eslint-disable react/require-default-props */
import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const authenticateModal = ({ authenticateModalOpen, toggleAuthenticateModal, typeofauthentication }) => {
  return (
    <Modal show={authenticateModalOpen} onHide={toggleAuthenticateModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{typeofauthentication}</Modal.Title>
      </Modal.Header>
      <Modal.Body>WORK IN PROGRESS!!</Modal.Body>
    </Modal>
  );
};

authenticateModal.propTypes = {
  authenticateModalOpen: PropTypes.bool.isRequired,
  toggleAuthenticateModal: PropTypes.func.isRequired,
  typeofauthentication: PropTypes.string,
};

export default authenticateModal;
