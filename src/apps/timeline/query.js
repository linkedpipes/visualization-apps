export const select = ({ graph }) => `
PREFIX schema: <http://schema.org/>
PREFIX dct: <http://purl.org/dc/terms/>
CONSTRUCT {
  ?resource
    dct:title ?title ;
    dct:date ?date ;
    schema:startDate ?startDate ;
    schema:endDate ?endDate .
}
FROM <${graph}>
WHERE {
  SELECT ?resource ?title ?startDate ?endDate ?date
  WHERE {
    {
      ?resource
        schema:startDate ?startDate ;
        schema:endDate ?endDate .
    }
    UNION
    {
      ?resource dct:date ?date .
    }
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
