import N3 from 'n3';
import jsonld from 'jsonld';

const TURTLE_FORMAT = 'text/turtle';

const term = (str) => {
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

jsonld.registerRDFParser(TURTLE_FORMAT, parseTurtle);

const fromTurtle = rdf =>
  jsonld.promises.fromRDF(rdf, { format: TURTLE_FORMAT });

const frame = frame => json =>
  frame ? jsonld.promises.frame(json, frame) : json;

const compact = (context, compactOptions = {}) => json =>
  context ? jsonld.promises.compact(json, context, compactOptions) : json;


export default {
  fromTurtle,
  frame,
  compact
}
