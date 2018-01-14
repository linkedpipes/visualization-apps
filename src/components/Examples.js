import React from 'react';
import { Link } from 'redux-little-router';

import { isLocalhost } from '../utils';

import './Examples.css';

const generateHref = app => ({
  pathname: `/${app}`,
  query: {
    service: isLocalhost()
      ? `/${app}-service.ttl`
      : `https://raw.githubusercontent.com/karelklima/visualisation-apps/master/public/${app}-service.ttl`
  }
});

const Examples = () => (
  <div className="Examples">
    <Link href={generateHref('dcterms')}>
      Dublin Core Terms demo [datatable]
    </Link>
    <br /><br />
    <Link href={generateHref('foaf')}>
      Friend of a Friend demo [datatable]
    </Link>
    <br /><br />
    <Link href={generateHref('tv')}>
      Things and Values demo [bubble chart]
    </Link>
  </div>
);

export default Examples;
