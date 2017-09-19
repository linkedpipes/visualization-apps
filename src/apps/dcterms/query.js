export const count = ({ graph }) => `
PREFIX dct: <http://purl.org/dc/terms/>
CONSTRUCT {
  <http://count> <http://count> ?count .
}
WHERE {
  SELECT (count(*) as ?count)
  FROM <${graph}>
  WHERE {
    ?resource dcterms:title ?title .
  }
}
`;

export const select = ({ graph, limit = 10, offset = 0 }) => `
PREFIX dct: <http://purl.org/dc/terms/>
CONSTRUCT {
  ?resource dcterms:title ?title .
}
WHERE {
  SELECT ?resource ?title
  FROM <${graph}>
  WHERE {
    ?resource dcterms:title ?title .
  }
  LIMIT ${limit}
  OFFSET ${offset}
}
`;
