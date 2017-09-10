import React from 'react';
import { Link } from 'redux-little-router';

import { encodeConfig } from '../utils';

const dctermsExampleConfig = {
  endpoint: 'https://linked.opendata.cz/sparql',
  graph: 'http://linked.opendata.cz/resource/dataset/legislation/cz/uz'
};

const dctermsExampleHref = {
  pathname: '/dcterms',
  hash: `#${encodeConfig(dctermsExampleConfig)}`
};

const Examples = () => (
  <div>
    Demo
    <Link href={dctermsExampleHref}>
      DCTerms demo
    </Link>
  </div>
);

export default Examples;
