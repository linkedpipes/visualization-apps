import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { getEndpoint, getGraph } from '../selectors';


const styles = () => ({
  paper: {
    padding: '20px'
  }
});

const Config = ({ classes, endpoint, graph }) => (
  <div className="Config">
    <Paper className={classes.paper}>
      <Typography type="headline" component="h2">
        Configuration
      </Typography>
      <Typography type="body1" component="p">
        Endpoint: {endpoint}
      </Typography>
      <Typography type="body1" component="p">
        Graph: {graph}
      </Typography>
    </Paper>
  </div>
);

Config.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default connect(mapStateToProps)(withStyles(styles)(Config));
