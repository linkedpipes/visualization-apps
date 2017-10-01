export const count = ({ graph }) => `
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
CONSTRUCT {
  <http://count> <http://count> ?count .
}
FROM <${graph}>
WHERE {
  SELECT (count(*) as ?count)
  WHERE {
    {
      ?resource foaf:name [] .
    }
    UNION
    {
      ?resource foaf:mbox [] .
    }
    UNION
    {
      ?resource foaf:homepage [] .
    }
  }
}
`;

export const countContext = {
  '@context': {
    my: 'http://'
  }
};

export const select = ({ graph, limit = 10, offset = 0 }) => `
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
CONSTRUCT {
  ?resource foaf:name ?name ;
            foaf:mbox ?mbox ;
            foaf:homepage ?homepage .
}
FROM <${graph}>
WHERE {
  SELECT ?resource ?name ?mbox ?homepage
  WHERE {
    {
      ?resource foaf:name ?name .
    }
    UNION
    {
      ?resource foaf:mbox ?mbox .
    }
    UNION
    {
      ?resource foaf:homepage ?homepage .
    }
  }
  LIMIT ${limit}
  OFFSET ${offset}
}
`;

export const selectContext = {
  '@context': {
    foaf: 'http://xmlns.com/foaf/0.1/'
  }
};
