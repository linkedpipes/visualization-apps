import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Typography from 'material-ui/Typography';

import { getEndpoint, getGraph } from '../selectors';

import './Config.css';

const Config = ({ endpoint, graph }) => (
  <div className="Config">
    <Typography type="body1" component="p">
      Endpoint: {endpoint}
    </Typography>
    <Typography type="body1" component="p">
      Graph: {graph}
    </Typography>
  </div>
);

Config.propTypes = {
  endpoint: PropTypes.string,
  graph: PropTypes.string
};

Config.defaultProps = {
  endpoint: undefined,
  graph: undefined
};

const mapStateToProps = state => ({
  endpoint: getEndpoint(state),
  graph: getGraph(state)
});

export default connect(mapStateToProps)(Config);
