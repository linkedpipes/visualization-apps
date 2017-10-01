import qs from 'qs';
import N3 from 'n3';
import jsonld from 'jsonld';

const PROXY_URL = 'https://proxy.dokku.cz/';

export const encodeConfig = config => btoa(JSON.stringify(config));

export const decodeConfig = configString => JSON.parse(atob(configString));

export const buildAction = (type, payload) => ({ type, payload });

const buildProxyRequest = (url, queryParams, headers) => {
  const finalUrl = `${url}?${qs.stringify(queryParams)}`;
  const proxyUrl = `${PROXY_URL}?${qs.stringify({ [finalUrl]: true })}`;
  return new Request(proxyUrl, {
    headers: new Headers(headers)
  });
};

export const fetchProxy = (url, queryParams = {}, headers = {}) => {
  return fetch(buildProxyRequest(url, queryParams, headers));
};

export const fetchQuery = (endpoint, sparqlQuery) => {
  const queryParams = {
    query: sparqlQuery
  };
  const headers = {
    Accept: 'application/ld+json'
  };

  return fetchProxy(endpoint, queryParams, headers);
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
