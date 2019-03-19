import React from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from './NavBar';

const HomePage = () => {
  return (
    <Container>
      <NavBar />
      <div className="home-container">
        <h1>Home page content here ...</h1>
      </div>
    </Container>
  );
};

export default HomePage;
