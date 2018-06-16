import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Router from './root/Router';

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <Router />
  </React.Fragment>
  ,
  document.getElementById('root')
);

