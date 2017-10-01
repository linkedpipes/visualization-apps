import React from 'react';
import { Link } from 'redux-little-router';

// import { encodeConfig } from '../utils';

/* const dctermsExampleConfig = {
  endpoint: 'https://linked.opendata.cz/sparql',
  graph: 'http://linked.opendata.cz/resource/dataset/legislation/cz/uz'
}; */

const dctermsExampleService = 'https://raw.githubusercontent.com/karelklima/visualisation-apps/master/public/dcterms-service.ttl';

const dctermsExampleHref = {
  pathname: '/dcterms',
  query: {
    service: dctermsExampleService
  }
};

const Examples = () => (
  <div>
    <Link href={dctermsExampleHref}>
      DCTerms demo
    </Link>
  </div>
);

export default Examples;
