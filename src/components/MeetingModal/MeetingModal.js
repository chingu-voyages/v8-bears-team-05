/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'react-bootstrap';

const MeetingModal = ({ show, onHide, children }) => {
  return (
    <Modal show={show} onHide={onHide} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      {children}
    </Modal>
  );
};

export default MeetingModal;
