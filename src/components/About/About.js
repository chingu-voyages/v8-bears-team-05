/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import './About.css';
import { Container } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="aboutus">
      <h1>About us</h1>
      <hr />
      <p>
        This project is developed by Rishabh Agrawal & Iliyas Shahapure during the Chingu Voyage 8 held from March 2019
        to May 2019. Doodle Live provides the platform to the users to collaborate and share their ideas, wireframes,
        sketches, flow charts or anything they like with the unlimited number of friends, colleagues, subordinates
        and/or students. Doodle Live comes packed with a Whiteboard, Text Editor, Code Block and an integrated chat app
        with equal access as we believe everyone to be equal, so everyone should have the same rights and restrictions
        to share their thoughts with others. This encourages our users to share their thoughts freely with the wide
        variety of tools available to them. There are 16+ tools available just for doodling in the canvas. Our users can
        also edit texts, embed images & videos in a rich text editor which can be saved in a well-formatted MS word®
        supported docx file. That's not all, we also thought to make whiteboard interviews to be more fun and easy for
        the interviewee as well as the interviewer. Our users can easily write live code in the code block with
        automatic syntax highlighting available for 24+ commonly used languages. So reading and explaining code will not
        be an issue as both can be achieved from the same platform now. Keep doodling, keep sharing! #DoodleLive
      </p>
    </Container>
  );
};

export default About;
