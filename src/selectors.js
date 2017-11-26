import { createSelector } from 'reselect';
import { fetchQuery } from './utils';

export const getConfig = state => state.config;

export const getRouter = state => state.router;

export const getService = createSelector(
  getRouter,
  state => state.query.service
);

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

export const getAppLoaded = createSelector(
  getConfig,
  state => state.appLoaded
);

export const getEndpoint = createSelector(
  getConfig,
  state => state.endpoint
);

export const getGraph = createSelector(
  getConfig,
  state => state.defaultDataset.namedGraph.name
);

export const getFetchQuery = createSelector(
  getEndpoint,
  getGraph,
  (endpoint, graph) => ({ query, params = {}, context = undefined, frame = undefined, compactOptions = {} }) => {
    const allParams = {
      ...params,
      endpoint,
      graph
    };
    const sparqlQuery = typeof query === 'function'
      ? query(allParams)
      : query;
    return fetchQuery(endpoint, sparqlQuery, context, frame, compactOptions);
  }
);
