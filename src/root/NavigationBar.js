import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import GitHub from './GitHub';
import HomeIcon from '@material-ui/icons/Home';

const styles = () => ({
  appBar: {
    backgroundColor: '#24292e'
  },
  logo: {
    flex: 1,
    fontWeight: '500',
    textDecoration: 'none',
    color: '#fff'
  }
});

const NavigationBar = ({ classes, title }) => (
  <AppBar position="static" className={classes.appBar}>
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.logo}>
        {title}
      </Typography>
      <IconButton
        title="Home"
        color="inherit"
        href="/"
      >
        <HomeIcon />
      </IconButton>
      <IconButton
        title="GitHub"
        color="inherit"
        href="https://github.com/linkedpipes/visualization-apps"
      >
        <GitHub />
      </IconButton>
    </Toolbar>
  </AppBar>
);

NavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavigationBar);
