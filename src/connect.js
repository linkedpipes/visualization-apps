import qs from 'qs';
import { connect as refetch } from 'react-refetch';
import jsonld from './jsonld';

const PROXY_URL = 'https://proxy.dokku.cz/?';

const prefixProxy = url =>
  url.startsWith('http')
    ? `${PROXY_URL}${qs.stringify({ [url]: true })}`
    : url;

const configuration = {
  endpoint: undefined,
  graph: undefined
};

export const setConfiguration = ({ endpoint, graph }) => {
  configuration.endpoint = endpoint;
  configuration.graph = graph;
  console.log(`Service configuration:
  Endpoint: ${endpoint}
  Graph:    ${graph}`);
}

const assertConfiguration = () => {
  if (!configuration.endpoint || !configuration.graph) {
    throw Error("Service configuration is not set up");
  }
};

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const handleText = response =>
  Promise.resolve(response)
    .then(handleErrors)
    .then(response => response.text());

export const handleJson = response =>
  Promise.resolve(response)
    .then(handleErrors)
    .then(response => response.json());

export const handleRDF = ({ context = undefined, frame = undefined, compactOptions = {} }) => response =>
  handleText(response)
    .then(jsonld.fromTurtle)
    .then(jsonld.frame(frame))
    .then(jsonld.compact(context, compactOptions));

export const buildQuery = query => {
  assertConfiguration();

  if (typeof query === "function") {
    query = query(configuration);
  }

  const queryParams = {
    query
  };

  return `${configuration.endpoint}?${qs.stringify(queryParams)}`;
}

export const fetchQuery = ({ query, ...rest }) => {
  const url = prefixProxy(buildQuery(query));
  const request = new Request(url, {
    headers: new Headers({
      Accept: 'text/turtle'
    })
  });
  return fetch(request)
    .then(handleRDF(rest));
}

const buildRequest = mapping => {
  const options = {
    method: mapping.method,
    headers: mapping.headers,
    credentials: mapping.credentials,
    redirect: mapping.redirect,
    mode: mapping.mode,
    body: mapping.body
  }

  if (configuration.endpoint && mapping.url.startsWith(configuration.endpoint)) {
    options.headers = new Headers({
      Accept: 'text/turtle' /*'application/ld+json'*/
    });
  }

  const url = prefixProxy(mapping.url);

  return new Request(url, options);
}

export const connect = (handleResponse = handleJson) => refetch.defaults({
  buildRequest,
  handleResponse
});

export const getDescribeUrl = uri =>
  buildQuery(`DESCRIBE ${uri}`);
