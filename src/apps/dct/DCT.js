import React from 'react';

import InfiniteTable from '../../components/InfiniteTable';
import InfiniteColumn from '../../components/InfiniteColumn';

import { getInteger, stringRenderer } from '../../dataUtils';
import { fetchQuery } from '../../connect';

import { count, countContext, select, selectContext } from './query';

const loadCount = () => fetchQuery({ query: count, context: countContext })
  .then(json => getInteger(json['my:count']));

const loadRows = ({ startIndex, stopIndex }) => fetchQuery({
  query: select({ limit: stopIndex - startIndex + 1, offset: startIndex }),
  context: selectContext,
  compactOptions: { graph: true }
})
  .then(json => json['@graph']);

const DCT = (/*{ fetchQuery }*/) => (
  <InfiniteTable
    loadCount={loadCount}
    loadRows={loadRows}
  >
    <InfiniteColumn
      label="Index"
      dataKey="index"
      width={80}
    />
    <InfiniteColumn
      label="Title"
      dataKey="dct:title"
      cellRenderer={stringRenderer}
      width={200}
    />
    <InfiniteColumn
      label="Description"
      dataKey="dct:description"
      cellRenderer={stringRenderer}
      width={200}
      flexGrow={1}
    />
    <InfiniteColumn
      label="Created"
      dataKey="dct:created"
      cellRenderer={stringRenderer}
      width={150}
    />
  </InfiniteTable>
);

export default DCT;
