export const select = ({ limit = 100 }) => ({ graph }) => `
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX dbp: <http://dbpedia.org/property/>
CONSTRUCT {
  ?state dct:title ?name ;
            rdf:value ?population .
}
FROM <${graph}>
WHERE {
  SELECT ?state ?name ?population WHERE {
    ?state dbo:country dbr:United_States .
    ?state dbp:postalabbreviation ?name .
    ?state dbp:2010pop ?population .
  }
  LIMIT ${limit}
}
`;

export const context = {
  '@context': {
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    dct: 'http://purl.org/dc/terms/'
  }
};
