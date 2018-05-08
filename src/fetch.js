import N3 from 'n3';
import jsonld from 'jsonld';
import { connect } from 'react-refetch';
import urlJoin from 'url-join';

// const PROXY_URL = 'http://localhost:4000/';
const PROXY_URL = 'https://proxy.dokku.cz/';

export const encodeConfig = config => btoa(JSON.stringify(config));

export const decodeConfig = configString => JSON.parse(atob(configString));

export const buildAction = (type, payload) => ({ type, payload });

export const isLocalhost = () => document.location.href.startsWith('http://localhost');

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
  fetch(url).then(response => response.text());

export const fetchRDF = (url, context = undefined, frame = undefined, compactOptions = {}) =>
  fetchText(url)
    .then((rdf) => {
      jsonld.registerRDFParser('text/turtle', parseTurtle);
      return jsonld.promises.fromRDF(rdf, { format: 'text/turtle' });
    })
    .then(json => frame ? jsonld.promises.frame(json, frame) : json)
    .then(json => context ? jsonld.promises.compact(json, context, compactOptions) : json);

const fetchServiceConfig = (service) => {
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

  return fetchRDF(service, context, frame);
}

export const connectProxy = connect.defaults({
  buildRequest: function (mapping) {
    const options = {
      method: mapping.method,
      headers: mapping.headers,
      credentials: mapping.credentials,
      redirect: mapping.redirect,
      mode: mapping.mode,
      body: mapping.body
    }

    const url = mapping.url.startsWith('http')
      ? urlJoin(PROXY_URL, mapping.url)
      : mapping.url;

    return new Request(url, options);
  }
});

export const connectServiceConfig = connectProxy.defaults({
  fetch: fetchServiceConfig,
  handleResponse: (response) => response
});
