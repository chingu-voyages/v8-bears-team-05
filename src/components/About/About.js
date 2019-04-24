/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import './About.css';
import { Container } from 'react-bootstrap';
import about from '../../assets/undraw_good_team_m7uu.svg';

const About = () => {
  return (
    <div>
      <Container className="aboutus">
        <h1>About us</h1>
        <hr />
        <img className="about-img" src={about} alt="" align="left" />
        <p>
          This project is developed by <b>Rishabh Agrawal</b> & <b>Iliyas Shahapure</b> during the Chingu Voyage 8 held
          from March 2019 to May 2019.
        </p>
        <p>
          <b>Doodle Live</b> provides the platform to the users to collaborate and share their ideas, wireframes,
          sketches, flow charts or anything they like with the unlimited number of friends, colleagues, subordinates
          and/or students.
        </p>
        <p>
          Doodle Live comes packed with a <b>Whiteboard, Text Editor, Code Block and an integrated chat app</b> with
          equal access as we believe everyone to be equal, so everyone should have the same rights and restrictions to
          share their thoughts with others.
        </p>
        <p>
          This encourages our users to share their thoughts freely with the wide variety of tools available to them.
          There are <b>16+ tools</b> available just for doodling in the canvas.
        </p>
        <p>
          Our users can also <b>edit texts, embed images & videos</b> in a rich text editor which can be saved in a
          well-formatted MS word® supported docx file.
        </p>
        <p>
          That's not all, we also thought to make whiteboard interviews to be more fun and easy for the interviewee as
          well as the interviewer. Our users can easily write live code in the code block with{' '}
          <b>automatic syntax highlighting</b> available for <b>24+ commonly used languages</b>. So reading and
          explaining code will not be an issue as both can be achieved from the same platform now.
        </p>
        <p>
          Keep doodling, keep sharing!
          <br />
          #DoodleLive
        </p>
      </Container>
      <footer>Copyright © 2019 | All Rights Reserved.</footer>
    </div>
  );
};

export default About;
