import qs from 'qs';

export const encodeConfig = config => btoa(JSON.stringify(config));

export const decodeConfig = configString => JSON.parse(atob(configString));

export const fetchQuery = (endpoint, sparqlQuery) => {
  const queryParams = {
    format: 'application/x-json+ld',
    timeout: 0,
    debug: 'on',
    query: sparqlQuery
  };

  const uri = `${endpoint}?${qs.stringify(queryParams)}`;
  return fetch(uri);
};
