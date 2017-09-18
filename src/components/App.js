import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { Link } from 'redux-little-router';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';

import GitHub from './GitHub';
import Config from './Config';
import Examples from './Examples';

import { getTitle, getComponent, getEndpoint } from '../selectors';

import './App.css';

const styles = () => ({
  flex: {
    flex: 1,
  },
  logo: {
    fontWeight: '500',
    textDecoration: 'none',
    color: '#fff'
  },
  main: {
    padding: '40px'
  }
});

const App = ({ classes, title, Component, endpoint }) => (
  <div className="App">
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit" className={classes.flex}>
          <Link href="/" className={classes.logo}>
            Visualization Apps
          </Link>
        </Typography>
        <IconButton
          title="GitHub"
          color="contrast"
          href="https://github.com/karelklima/visualisation-apps"
        >
          <GitHub />
        </IconButton>
      </Toolbar>
    </AppBar>
    <main className={classes.main}>
      <Grid container spacing={24}>
        {endpoint ? (
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Config />
            </Grid>
            <Grid item xs={12}>
              <Component />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Examples />
            </Grid>
          </Grid>
        )}
      </Grid>
    </main>
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string,
  Component: PropTypes.func.isRequired,
};

App.defaultProps = {
  endpoint: undefined,
  graph: undefined
};

const mapStateToProps = state => ({
  title: getTitle(state),
  endpoint: getEndpoint(state),
  Component: getComponent(state)
});

export default connect(mapStateToProps)(withStyles(styles)(App));
