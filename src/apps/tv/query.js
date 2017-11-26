export const count = ({ graph }) => `
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX s: <http://schema.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
CONSTRUCT {
  <http://count> <http://count> ?count .
}
FROM <${graph}>
WHERE {
  SELECT (count(*) as ?count)
  WHERE {
    ?resource rdf:value ?value .
    ?resource s:object <http://linked.opendata.cz/ontology/domain/cenia.cz/chemicals/arsen-a-sloučeniny-jako-as-> .
    <http://linked.opendata.cz/ontology/domain/cenia.cz/chemicals/arsen-a-sloučeniny-jako-as-> skos:prefLabel ?title .
  }
}
`;

export const countContext = {
  '@context': {
    my: 'http://'
  }
};

export const select = ({ graph, limit = 10, offset = 0 }) => `
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX s: <http://schema.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
CONSTRUCT {
  ?resource dct:title ?title ;
            rdf:value ?value .
}
FROM <${graph}>
WHERE {
  SELECT DISTINCT ?resource ?title ?value
  WHERE {
    ?resource rdf:value ?value .
    ?resource s:object <http://linked.opendata.cz/ontology/domain/cenia.cz/chemicals/arsen-a-sloučeniny-jako-as-> .
    <http://linked.opendata.cz/ontology/domain/cenia.cz/chemicals/arsen-a-sloučeniny-jako-as-> skos:prefLabel ?title .
  }
  LIMIT ${limit}
  OFFSET ${offset}
}
`;

export const selectContext = {
  '@context': {
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    dct: 'http://purl.org/dc/terms/'
  }
};
