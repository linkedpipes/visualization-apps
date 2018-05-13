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

const FOAF = () => (
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
      label="Name"
      dataKey="foaf:name"
      cellRenderer={stringRenderer}
      width={200}
    />
    <InfiniteColumn
      label="Mbox"
      dataKey="foaf:mbox"
      cellRenderer={stringRenderer}
      width={200}
    />
    <InfiniteColumn
      label="Homepage"
      dataKey="foaf:homepage"
      cellRenderer={stringRenderer}
      width={200}
      flexGrow={1}
    />
  </InfiniteTable>
);

export default FOAF;
