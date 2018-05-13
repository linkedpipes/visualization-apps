import React from 'react';
import Timeline from 'react-visjs-timeline';

import Screen from '../../components/Screen';
import Loading from '../../components/Loading';

import { connect, handleRDF, buildQuery } from '../../connect';
import { getString } from '../../dataUtils';
import { log, filterUndefined } from '../../utils';

import { select, context } from './query';

import './TIMELINE.css';

const options = {
  orientation: 'top',
  height: 'auto',
  selectable: false,
  showCurrentTime: false
};

const TIMELINE = ({ data }) => {

  if (data.pending) {
    return (
      <Screen>
        <Loading/>
      </Screen>
      );
  }

  if (data.rejected) {
    console.error(data.reason);
    return (
      <Screen>
        <h1>Unable to fetch data</h1>
        <h2>{data.reason.toString()}</h2>
      </Screen>
    );
  }

  console.log(data.value);
  
  return (
    <div className="TIMELINE">
      <Timeline options={options} items={data.value}/>
    </div>
  );
}

const buildContent = ({ id, title, start, end }) => {
  const html = [];
  if (title) {
    html.push(`<div class="title">${title}</div>`);
  }
  if (end) {
    html.push(`<div class="date">${start} &ndash; ${end}</div>`)
  } else {
    html.push(`<div class="date">${start}</div>`)
  }
  return html.join('');
}

const handle = response =>
  handleRDF({ context, compactOptions: { graph: true } })(response)
    .then(log)
    .then(json => json['@graph'].map((entry, index) => {
      try {
        const dateData = entry['dct:date']
          ? {
          start: getString(entry['dct:date'])
        } : { 
          start: getString(entry['schema:startDate']),
          end: getString(entry['schema:endDate'])
        }
        if (dateData.start === dateData.end) {
          dateData.end = undefined;
        }

        const title = entry['dct:title']
          ? getString(entry['dct:title'])
          : undefined;

        const id = entry['@id'];
        return {
          id,
          ...dateData,
          content: buildContent({ id, title, ...dateData })
        };
      }
      catch (e) {
        console.error('Invalid data entry');
        console.error(entry);
        console.error(e);
      }
      return undefined;
    }))
    .then(filterUndefined);

const requests = () => ({
  data: buildQuery(select)
});

export default connect(handle)(requests)(TIMELINE);
