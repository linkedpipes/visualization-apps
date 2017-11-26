export const count = ({ graph }) => `
PREFIX dct: <http://purl.org/dc/terms/>
CONSTRUCT {
  <http://count> <http://count> ?count .
}
FROM <${graph}>
WHERE {
  SELECT (count(*) as ?count)
  WHERE {
    {
      ?resource dct:title [] .
    }
    UNION
    {
      ?resource dct:description [] .
    }
    UNION
    {
      ?resource dct:created [] .
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
PREFIX dct: <http://purl.org/dc/terms/>
CONSTRUCT {
  ?resource dct:title ?title ;
            dct:description ?description ;
            dct:created ?created .
}
FROM <${graph}>
WHERE {
  SELECT ?resource ?title ?description ?created
  WHERE {
    {
      ?resource dct:title ?title .
    }
    UNION
    {
      ?resource dct:description ?description .
    }
    UNION
    {
      ?resource dct:created ?created .
    }
  }
  LIMIT ${limit}
  OFFSET ${offset}
}
`;

export const selectContext = {
  '@context': {
    dct: 'http://purl.org/dc/terms/'
  }
};
