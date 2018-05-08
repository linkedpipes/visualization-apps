import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

const NotFound = () => (
  <div className="NotFound">
    <h1>404 Not Found</h1>
    <Link to='/'>
      Go to Homepage
    </Link>
  </div>
);

export default NotFound;
