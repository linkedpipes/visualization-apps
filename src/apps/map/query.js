export const select = ({ graph }) => `
PREFIX schema: <http://schema.org/>
PREFIX dct: <http://purl.org/dc/terms/>
CONSTRUCT {
  ?resource
    dct:title ?title ;
    schema:latitude ?latitude ;
    schema:longitude ?longitude .
}
FROM <${graph}>
WHERE {
  SELECT ?resource ?title ?latitude ?longitude
  WHERE {
    ?resource
      schema:latitude ?latitude ;
      schema:longitude ?longitude .
    OPTIONAL {
      ?resource dct:title ?title .
    }
  }
  LIMIT 1000
}
`;

export const context = {
  '@context': {
    dct: 'http://purl.org/dc/terms/',
    schema: 'http://schema.org/'
  }
};
