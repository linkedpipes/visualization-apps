export const count = ({ graph }) => `
PREFIX dct: <http://purl.org/dc/terms/>
CONSTRUCT {
  <http://count> <http://count> ?count .
}
FROM <${graph}>
WHERE {
  SELECT (count(*) as ?count)
  WHERE {
    ?resource dct:title ?title .
  }
}
`;

export const select = ({ graph, limit = 10, offset = 0 }) => `
PREFIX dct: <http://purl.org/dc/terms/>
CONSTRUCT {
  ?resource dct:title ?title .
}
FROM <${graph}>
WHERE {
  SELECT ?resource ?title
  WHERE {
    ?resource dct:title ?title .
  }
  LIMIT ${limit}
  OFFSET ${offset}
}
`;
