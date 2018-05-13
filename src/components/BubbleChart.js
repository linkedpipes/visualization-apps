import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const color = d3.scaleOrdinal(d3.schemeCategory10);

const Bubble = ({ node }) => {
  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
    >
      <circle
        r={node.r}
        fill={color(node.data.id)}
      />
      <text
        textAnchor="middle"
        dy="0.3em"
      >
        {node.data.title}
      </text>
    </g>
  );
};

Bubble.propTypes = {
  node: PropTypes.object.isRequired
};

const Bubbles = ({ nodes }) => nodes.map(node => <Bubble node={node} key={node.data.id} />);

Bubbles.propTypes = {
  nodes: PropTypes.array.isRequired
};

const BubbleChart = ({ data, width, height }) => {
  const d3Data = { children: data };

  const bubblePack = d3.pack(d3Data).size([width, height]).padding(1.5);

  const nodes = d3.hierarchy(d3Data)
    .sum(d => d.id);

  const bubbles = bubblePack(nodes).descendants().filter(node => node.depth > 0);

  return (
    <div>
      <svg width={width} height={height}>
        <Bubbles nodes={bubbles} />
      </svg>
    </div>
  );
};

BubbleChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

BubbleChart.defaultProps = {
  data: []
};

export default BubbleChart;
