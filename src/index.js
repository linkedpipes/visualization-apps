import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Router from './root/Router';

const theme = createMuiTheme();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router />
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);

