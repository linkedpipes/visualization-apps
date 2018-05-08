import React from 'react';
import { Link } from 'react-router-dom';
import { isLocalhost } from '../utils';

import './Examples.css';

const generateHref = app => {
  const service = isLocalhost()
    ? `/${app}-service.ttl`
    : `https://raw.githubusercontent.com/karelklima/visualisation-apps/master/public/${app}-service.ttl`;
  return `/${app}?service=${service}`;
};

const Examples = () => (
  <div className="Examples">
    <Link to={generateHref('dcterms')}>
      Dublin Core Terms demo [datatable]
    </Link>
    <br /><br />
    <Link to={generateHref('foaf')}>
      Friend of a Friend demo [datatable]
    </Link>
    <br /><br />
    <Link to={generateHref('tv')}>
      Things and Values demo [bubble chart]
    </Link>
  </div>
);

export default Examples;
