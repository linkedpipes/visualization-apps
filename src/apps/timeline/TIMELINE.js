import React from 'react';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';

import withLoading from '../../components/withLoading';
import withClassFilter from '../../components/withClassFilter';

import { connect, handleRDF, buildQuery } from '../../connect';
import { map } from '../../dataUtils';
import { log } from '../../utils';

import { select, context } from './query';

import './TIMELINE.css';

const options = {
  orientation: 'top',
  height: 'auto',
  selectable: false,
  showCurrentTime: false
};

const TIMELINE = ({ data }) => (
  <div className="TIMELINE">
    <Timeline options={options} items={data}/>
  </div>
);

const buildDate = date => {
  const friendly = moment(date).format('MMMM Qo, YYYY');
  return `<a title=${date}>${friendly}</a>`;
}

const buildContent = ({ id, name, start, end }) => {
  const html = [];
  html.push(`<div class="title"><a href=${id} title=${id} target="_blank">`);
  if (name) {
    html.push(name);
  } else {
    html.push(id);
  }
  html.push('</a></div>');
  html.push('<div class="date">');
  html.push(buildDate(start));
  if (end) {
    html.push(' &ndash; ');
    html.push(buildDate(end))
  }
  html.push('</div>');
  return html.join('');
}

const handle = response =>
  handleRDF({ context, compactOptions: { graph: true } })(response)
    .then(log)
    .then(map({
      id: { key: '@id' },
      name: { key: 'dct:title', optional: true },
      date: { key: 'dct:date', optional: true },
      start: { key: 'schema:startDate', optional: true },
      end: { key: 'schema:endDate', optional: true }
    }))
    .then(entries => entries.map(entry => {
      const mapped = { ...entry };
      if (mapped.date) {
        mapped.start = mapped.date;
      }
      if (mapped.start === mapped.end) {
        mapped.end = undefined;
      }
      mapped.content = buildContent(mapped);
      return mapped;
    }));

const requests = () => ({
  data: buildQuery(select)
});

export default connect(handle)(requests)(withLoading(withClassFilter(TIMELINE)));
