import qs from 'qs';
import N3 from 'n3';
import jsonld from 'jsonld';

// const PROXY_URL = 'http://localhost:4000/';
const PROXY_URL = 'https://proxy.dokku.cz/';

export const encodeConfig = config => btoa(JSON.stringify(config));

export const decodeConfig = configString => JSON.parse(atob(configString));

export const buildAction = (type, payload) => ({ type, payload });

const buildProxyRequest = (url, queryParams, headers) => {
  const finalUrl = `${url}?${qs.stringify(queryParams)}`;
  console.log('FINAL');
  console.log(finalUrl);
  const proxyUrl = `${PROXY_URL}?${qs.stringify({ [finalUrl]: true })}`;
  return new Request(proxyUrl, {
    headers: new Headers(headers)
  });
};

export const fetchProxy = (url, queryParams = {}, headers = {}) => {
  return fetch(buildProxyRequest(url, queryParams, headers));
};

export const fetchQuery = (endpoint, sparqlQuery, context = undefined, frame = undefined, compactOptions = {}) => {
  console.log(sparqlQuery);
  const queryParams = {
    query: sparqlQuery
  };
  const headers = {
    Accept: 'application/ld+json'
  };

  return fetchProxy(endpoint, queryParams, headers)
    .then(response => response.json())
    .then((response) => {
      console.log(JSON.stringify(response));
      return response;
    })
    .then(response => Array.isArray(response) ? { '@graph': response } : response)
    .then(json => frame ? jsonld.promises.frame(json, frame) : json)
    .then(json => context ? jsonld.promises.compact(json, context, compactOptions) : json)
    .then((response) => {
      console.log(JSON.stringify(response));
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const term = (str) => {
  if (N3.Util.isBlank(str)) {
    return {
      type: 'blank node',
      value: str
    };
  } else if (N3.Util.isLiteral(str)) {
    const ret = {
      type: 'literal',
      value: N3.Util.getLiteralValue(str),
      datatype: N3.Util.getLiteralType(str),
    };

    const language = N3.Util.getLiteralLanguage(str);
    if (language !== '') {
      ret.language = language;
    }

    return ret;
  }

  return {
    type: 'IRI',
    value: str
  };
};

export const parseTurtle = input => new Promise((resolve, reject) => {
  const parser = new N3.Parser();
  const triples = [];

  parser.parse(input, (err, triple) => {
    if (err) {
      reject(err);
    } else if (triple) {
      triples.push({
        subject: term(triple.subject),
        predicate: term(triple.predicate),
        object: term(triple.object)
      });
    } else {
      resolve({ /* '@context': parser._prefixes, */ '@default': triples });
    }
  });
});

export const fetchText = url =>
  fetchProxy(url).then(response => response.text());

export const fetchRDF = (url, context = undefined, frame = undefined, compactOptions = {}) =>
  fetchText(url)
    .then((rdf) => {
      jsonld.registerRDFParser('text/turtle', parseTurtle);
      return jsonld.promises.fromRDF(rdf, { format: 'text/turtle' });
    })
    .then(json => frame ? jsonld.promises.frame(json, frame) : json)
    .then(json => context ? jsonld.promises.compact(json, context, compactOptions) : json);
