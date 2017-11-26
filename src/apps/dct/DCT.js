import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InfiniteTable from '../../components/InfiniteTable';
import InfiniteColumn from '../../components/InfiniteColumn';

import { getFetchQuery } from '../../selectors';
import { getInteger, stringRenderer } from '../../dataUtils';

import { count, countContext, select, selectContext } from './query';

const DCT = ({ fetchQuery }) => {
  const loadCount = () => fetchQuery({ query: count, context: countContext })
    .then(json => getInteger(json['my:count']));

  const loadRows = ({ startIndex, stopIndex }) => fetchQuery({
    query: select,
    params: { limit: stopIndex - startIndex + 1, offset: startIndex },
    context: selectContext,
    compactOptions: { graph: true }
  })
    .then(json => json['@graph']);

  return (
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
};

DCT.propTypes = {
  fetchQuery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fetchQuery: getFetchQuery(state)
});

export default connect(mapStateToProps)(DCT);
