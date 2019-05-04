/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import './NotFoundPage.css';
import notFound from '../../assets/undraw_not_found_60pq.svg';
import AuthenticateModal from '../authenticateModal/authenticateModal';

const NotFoundPage = ({ toggleAuthenticateModal, authenticateModalOpen, typeofauthentication }) => {
  return (
    <>
      <AuthenticateModal
        authenticateModalOpen={authenticateModalOpen}
        toggleAuthenticateModal={toggleAuthenticateModal}
        typeofauthentication={typeofauthentication}
      />
      <div className="not-found-container">
        <img src={notFound} alt="404image" />
        <p>
          404 Not Found!{' '}
          <span role="img" aria-labelledby="sad-emoji">
            😢
          </span>
        </p>
      </div>
    </>
  );
};
NotFoundPage.propTypes = {
  toggleAuthenticateModal: PropTypes.func.isRequired,
  authenticateModalOpen: PropTypes.bool.isRequired,
  typeofauthentication: PropTypes.string,
};
export default NotFoundPage;
