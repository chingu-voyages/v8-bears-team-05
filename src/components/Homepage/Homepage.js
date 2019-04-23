/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Homepage.css';
import undrawDesignThinking from '../../assets/undraw_design_thinking_x8f6.svg';
import undrawPairProgramming from '../../assets/undraw_pair_programming_njlp.svg';
import whiteboard from '../../assets/whiteboard.svg';
import code from '../../assets/software.svg';
import videoCall from '../../assets/video-call (1).svg';
import AuthenticateModal from '../authenticateModal/authenticateModal';

const Homepage = ({ history, authenticateModalOpen, toggleAuthenticateModal, typeofauthentication }) => {
  const onStart = () => {
    history.push('/boardandeditor');
    sessionStorage.setItem('refresh', false);
  };

  return (
    <>
      <AuthenticateModal
        authenticateModalOpen={authenticateModalOpen}
        toggleAuthenticateModal={toggleAuthenticateModal}
        typeofauthentication={typeofauthentication}
      />
      <div>
        <div>
          <div className="hero-container container">
            <div className="hero-header-container">
              <h1>
                Take your team work <br />
                to Next level
              </h1>
              <h4>work together anywhere , any time.</h4>
              <Button className="try-btn" onClick={onStart}>
                START NOW
              </Button>
            </div>
            <div>
              <img className="undrawDesignThinking" src={undrawDesignThinking} alt="" />
              <img className="undrawPairProgramming" src={undrawPairProgramming} alt="" />
            </div>
          </div>
          <main>
            <h1 className="feature-title">FEATURES</h1>
            <hr />
            <div className="feature container-fluid">
              <Card>
                <Card.Body>
                  <Card.Title>Host Unlimited Meetings</Card.Title>
                  <Card.Text>
                    Our users can host unlimited meetings to share their ideas remotely with no sign-ups required.
                  </Card.Text>
                </Card.Body>
              </Card>
              <div className="feature-image">
                <img src={whiteboard} alt="" />
              </div>
            </div>
            <div className="feature container-fluid">
              <div className="feature-image">
                <img src={code} alt="" />
              </div>
              <Card>
                <Card.Body>
                  <Card.Title>Sketch & Share</Card.Title>
                  <Card.Text>
                    Our users can doodle collaboratively on the infinite canvas and save them as images locally.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="feature container-fluid">
              <Card>
                <Card.Body>
                  <Card.Title>Live Chat Integration</Card.Title>
                  <Card.Text>
                    Our users can chat live with their connected peers in the meetings making the session more engaging
                    and fun for everyone.
                  </Card.Text>
                </Card.Body>
              </Card>
              <div className="feature-image">
                <img src={videoCall} alt="" />
              </div>
            </div>
            <div className="feature container-fluid">
              <div className="feature-image">
                <img src={code} alt="" />
              </div>
              <Card>
                <Card.Body>
                  <Card.Title>Share notes with our rich text editor</Card.Title>
                  <Card.Text>
                    Our users can edit texts, embed images and videos in a rich text editor which can be saved in a
                    well-formatted MS word® supported docx file.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="feature container-fluid">
              <Card>
                <Card.Body>
                  <Card.Title>Live code with Automatic Syntax Highlighting</Card.Title>
                  <Card.Text>
                    Our users can code live on the code block with automatic syntax highlighting available for 24+
                    commonly used languages and explain things easily on the whiteboard.
                  </Card.Text>
                </Card.Body>
              </Card>
              <div className="feature-image">
                <img src={videoCall} alt="" />
              </div>
            </div>
          </main>
          <footer>Copyright © 2019 | All Rights Reserved.</footer>
        </div>
      </div>
    </>
  );
};

Homepage.propTypes = {
  history: PropTypes.object.isRequired,
  toggleAuthenticateModal: PropTypes.func.isRequired,
  authenticateModalOpen: PropTypes.bool.isRequired,
  typeofauthentication: PropTypes.string,
};

export default withRouter(Homepage);
