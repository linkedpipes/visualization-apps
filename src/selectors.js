import { createSelector } from 'reselect';
import { decodeConfig, fetchQuery } from './utils';

export const getRouter = state => state.router;

export const getRouterResult = createSelector(
  getRouter,
  state => state.result
);

export const getTitle = createSelector(
  getRouterResult,
  state => state.title
);

export const getComponent = createSelector(
  getRouterResult,
  state => state.component
);

export const getConfig = createSelector(
  getRouter,
  state => state.hash.length
    ? decodeConfig(state.hash.substring(1))
    : {}
);

export const getEndpoint = createSelector(
  getConfig,
  state => state.endpoint
);

export const getGraph = createSelector(
  getConfig,
  state => state.graph
);

export const getFetchQuery = createSelector(
  getEndpoint,
  getGraph,
  (endpoint, graph) => (query, params = {}) => {
    const allParams = {
      ...params,
      endpoint,
      graph
    };
    const sparqlQuery = typeof query === 'function'
      ? query(allParams)
      : query;
    return fetchQuery(endpoint, sparqlQuery);
  }
);
