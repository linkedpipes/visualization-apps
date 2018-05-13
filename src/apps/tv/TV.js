import React from 'react';

import { connect, handleRDF, buildQuery } from '../../connect';
import { getInteger, getString } from '../../dataUtils';

import BubbleChart from '../../components/BubbleChart';

import { select, context } from './query';

const TV = ({ data }) => {
  if (data.rejected) {
    return "Unable to load data";
  }
  if (!data.fulfilled) {
    return "Loading";
  }
  console.log(data.value);
  return <BubbleChart data={data.value} width={800} height={800} />;
}

const handle = response =>
  handleRDF({ context, compactOptions: { graph: true } })(response)
    .then(json => json['@graph'].map((entry, index) => ({
      id: index + 1,
      xid: entry['@id'],
      title: getString(entry['dct:title']),
      size: getInteger(entry['rdf:value'])
    })));

const requests = () => ({
  data: buildQuery(select({ limit: 100 }))
});

export default connect(handle)(requests)(TV);
