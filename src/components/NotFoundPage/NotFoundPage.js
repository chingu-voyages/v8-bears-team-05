import React from 'react';

import './NotFoundPage.css';
import notFound from '../../assets/undraw_not_found_60pq.svg';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img src={notFound} alt="404image" />
      <p>404 Not Found</p>
    </div>
  );
};

export default NotFoundPage;
