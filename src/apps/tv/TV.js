import React from 'react';
import PropTypes from 'prop-types';
import Async from 'react-promise';
import { connect } from 'react-redux';

import { getFetchQuery } from '../../selectors';

import BubbleChart from '../../components/BubbleChart';

import { select, selectContext } from './query';

const log = (value) => { console.log(value); return value; };

const TV = ({ fetchQuery }) => {
  const data = fetchQuery({
    query: select,
    params: { limit: 100 },
    context: selectContext,
    compactOptions: { graph: true }
  })
    .then(log)
    .then(json => json['@graph'].map((entry, index) => ({
      id: index + 1,
      xid: entry['@id'],
      title: entry['dct:title'],
      size: entry['rdf:value']
    })))
    .then(log);


  const dataTest = [
    { id: 1,
      title: 'oneField',
      size: 150,
      g: 80
    },
    { id: 2,
      title: 'Teaser',
      size: 30,
      g: 50
    },
    { id: 3,
      title: 'Crazy',
      size: 70,
      g: 80
    }
  ];

  return (
    <Async promise={data} then={value => <BubbleChart data={value} width={800} height={800} />} />
  );
};

TV.propTypes = {
  fetchQuery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fetchQuery: getFetchQuery(state)
});

export default connect(mapStateToProps)(TV);
