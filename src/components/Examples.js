import React from 'react';
import { Link } from 'redux-little-router';

import './Examples.css';

const dctermsExampleService = 'https://raw.githubusercontent.com/karelklima/visualisation-apps/master/public/dcterms-service.ttl';
// const dctermsExampleService = 'http://localhost:3000/dcterms-service.ttl';

const dctermsExampleHref = {
  pathname: '/dct',
  query: {
    service: dctermsExampleService
  }
};

const foafExampleService = 'https://raw.githubusercontent.com/karelklima/visualisation-apps/master/public/foaf-service.ttl';

const foafExampleHref = {
  pathname: '/foaf',
  query: {
    service: foafExampleService
  }
};

const Examples = () => (
  <div className="Examples">
    <Link href={dctermsExampleHref}>
      DCT demo
    </Link>
    <br /><br />
    <Link href={foafExampleHref}>
      FOAF demo
    </Link>
  </div>
);

export default Examples;
