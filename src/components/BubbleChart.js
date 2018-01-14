import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const color = d3.scaleOrdinal(d3.schemeCategory20);

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
  /*createBubbleChart() {
    /*const node = this.node;
    const data = this.state.data;
    const format = d3.format(',d');
    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const bubble = d3.pack(data)
      .size([width, height])
      .padding(1.5);

    const nodes = d3.hierarchy(data)
      .sum(d => d.id);


    const getSelect = select(node)
      .selectAll('circle')
      .data(bubble(nodes).descendants())
      .enter()
      .filter(d => !d.children)
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    getSelect.append('circle')
      .attr('id', (d) => { return d.data.id; })
      .attr('r', (d) => { return d.r; })
      .style('fill', (d) => { return color(d.data.id); });

    getSelect.append('text')
      .attr('dy', '.3em')
      .attr('font-size', '10px')
      .style('text-anchor', 'middle')
      .text(d => `${d.data.id}: ${d.data.title}`);

    getSelect.append('title')
      .text(d => `${d.data.id}\n${format(d.value)}`);
}*/

  const d3Data = { children: data };

  const bubblePack = d3.pack(d3Data).size([width, height]).padding(1.5);
  console.log(bubblePack);

  const nodes = d3.hierarchy(d3Data)
    .sum(d => d.id);

  const bubbles = bubblePack(nodes).descendants().filter(node => node.depth > 0);

  console.log(nodes);

  console.log(bubbles);

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
