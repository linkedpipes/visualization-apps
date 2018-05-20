export const select = ({ graph }) => `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX schema: <http://schema.org/>
PREFIX dct: <http://purl.org/dc/terms/>

CONSTRUCT {
  ?resource
    a ?type ;
    dct:title ?title ;
    schema:latitude ?latitude ;
    schema:longitude ?longitude .
}
FROM <${graph}>
WHERE {
  SELECT ?resource ?type ?title ?latitude ?longitude
  WHERE {
    ?resource
      schema:latitude ?latitude ;
      schema:longitude ?longitude .
    OPTIONAL {
      ?resource dct:title ?title .
    }
    OPTIONAL {
      ?resource a ?type .
    }
  }
  LIMIT 10000
}
`;

export const context = {
  '@context': {
    dct: 'http://purl.org/dc/terms/',
    schema: 'http://schema.org/'
  }
};
