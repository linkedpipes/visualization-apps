import React from 'react';
import PropTypes from 'prop-types';
import { connectServiceConfig } from '../fetch';
import { fetchQuery } from '../utils';

import './Service.css';

/*<Typography type="body1" component="p">
      Endpoint: {endpoint}
    </Typography>
    <Typography type="body1" component="p">
      Graph: {graph}
    </Typography>*/

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
    const endpoint = serviceFetch.value.endpoint;
    const graph = serviceFetch.value.defaultDataset.namedGraph.name;
    console.log('Endpoint: ', endpoint);
    console.log('Graph: ', graph);
    const fetchQueryHelper = ({ query, params = {}, context = undefined, frame = undefined, compactOptions = {} }) => {
      const allParams = {
        ...params,
        endpoint,
        graph
      };
      const sparqlQuery = typeof query === 'function'
        ? query(allParams)
        : query;
      return fetchQuery(endpoint, sparqlQuery, context, frame, compactOptions);
    };
    return <Component fetchQuery={fetchQueryHelper}/>;
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

const toFetch = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const serviceUrl = params.get('service');
  return {
    serviceFetch: `${serviceUrl}`,
  };
}

export default connectServiceConfig(toFetch)(Service);
