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

import { getTitle, getComponent, getEndpoint, getAppLoaded } from '../selectors';

import './App.css';

const styles = () => ({
  flex: {
    flex: 1,
  },
  logo: {
    fontWeight: '500',
    textDecoration: 'none',
    color: '#fff'
  }
});

const App = ({ classes, title, Component, endpoint, appLoaded }) => (
  <div className="App">
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit" className={classes.flex}>
          <Link href="/" className={classes.logo}>
            {title}
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
    <main>
      {appLoaded && endpoint ? (<Component />) : null}
      {appLoaded && !endpoint ? (<Examples />) : null}
    </main>
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  appLoaded: PropTypes.bool.isRequired,
  endpoint: PropTypes.string,
  Component: PropTypes.func.isRequired,
};

App.defaultProps = {
  appLoaded: false,
  endpoint: undefined,
  graph: undefined
};

const mapStateToProps = state => ({
  title: getTitle(state),
  appLoaded: getAppLoaded(state),
  endpoint: getEndpoint(state),
  Component: getComponent(state)
});

export default connect(mapStateToProps)(withStyles(styles)(App));
