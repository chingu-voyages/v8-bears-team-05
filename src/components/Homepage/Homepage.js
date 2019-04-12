/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Homepage.css';
import undrawDesignThinking from '../../assets/undraw_design_thinking_x8f6.svg';
import undrawPairProgramming from '../../assets/undraw_pair_programming_njlp.svg';
import whiteboard from '../../assets/whiteboard.svg';
import code from '../../assets/software.svg';
import videoCall from '../../assets/video-call (1).svg';

const Homepage = props => {
  const onStart = () => {
    props.history.push('/boardandeditor');
  };

  return (
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
          <div className="feature container-fluid">
            <Card>
              <Card.Body>
                <Card.Title>Interactive White Board</Card.Title>
                <Card.Text>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo
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
                <Card.Title>BROWSER BASED CODE EDITOR</Card.Title>
                <Card.Text>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="feature container-fluid">
            <Card>
              <Card.Body>
                <Card.Title>STAY CONNECTED WHEREVER YOU GO</Card.Title>
                <Card.Text>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo
                </Card.Text>
              </Card.Body>
            </Card>
            <div className="feature-image">
              <img src={videoCall} alt="" />
            </div>
          </div>
        </main>
        <footer>
          <Link to="/">Home</Link>
          <Link to="/joinameeting">Join A Meeting</Link>
          <Link to="/hostameeeting">Host A Meeting</Link>
        </footer>
      </div>
    </div>
  );
};

Homepage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Homepage);
