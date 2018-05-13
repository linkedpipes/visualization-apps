import React from 'react';
import PropTypes from 'prop-types';
import { connect, handleRDF, setConfiguration } from '../connect';

import './Service.css';

const contextSpec = {
  sd: 'http://www.w3.org/ns/sparql-service-description#',
  endpoint: { '@id': 'http://www.w3.org/ns/sparql-service-description#endpoint', '@type': '@id' },
  resultFormat: { '@id': 'http://www.w3.org/ns/sparql-service-description#resultFormat', '@type': '@id' },
  supportedLanguage: { '@id': 'http://www.w3.org/ns/sparql-service-description#supportedLanguage', '@type': '@id' },
  defaultDataset: { '@id': 'http://www.w3.org/ns/sparql-service-description#defaultDataset', '@type': '@id' },
  name: { '@id': 'http://www.w3.org/ns/sparql-service-description#name', '@type': '@id' },
  namedGraph: { '@id': 'http://www.w3.org/ns/sparql-service-description#namedGraph', '@type': '@id' }
};

const frame = {
  '@context': contextSpec,
  '@type': 'http://www.w3.org/ns/sparql-service-description#Service'
};

const context = {
  '@context': contextSpec
};

const renderStatus = ({ serviceFetch, component: Component }) => {
  if (serviceFetch.pending) {
    return (
      <div className="status">
        <h1>Fetching service configuration...</h1>
        <h2>It might take a minute to load</h2>
      </div>
    );
  }
  if (serviceFetch.rejected) {
    console.error(serviceFetch.reason);
    return (
      <div className="status">
        <h1>Unable to fetch service configuration</h1>
        <h2>{serviceFetch.reason.toString()}</h2>
      </div>
    );
  }
  if (serviceFetch.fulfilled) {
    return <Component />;
  }
}

const Service = ({ component, serviceFetch }) => (
  <div className="Service">
    {renderStatus({ component, serviceFetch })}
  </div>
);

Service.propTypes = {
  location: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  serviceFetch: PropTypes.object.isRequired
};

const handle = response =>
  handleRDF({ context, frame })(response)
    .then(value => {
      setConfiguration({
        endpoint: value.endpoint,
        graph: value.defaultDataset.namedGraph.name
      });
      return value;
    });

const requests = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const serviceUrl = params.get('service');
  return {
    serviceFetch: `${serviceUrl}`,
  };
}

export default connect(handle)(requests)(Service);
