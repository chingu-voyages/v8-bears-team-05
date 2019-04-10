/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Modal, Button } from 'react-bootstrap';
import './Modal.css';

const modal = ({ show, toggleModal, imageDrop }) => {
  return (
    <div>
      <Modal show={show} onHide={toggleModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Drop a image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropzone onDrop={imageDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="droparea">
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

modal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  imageDrop: PropTypes.func.isRequired,
};
export default modal;
