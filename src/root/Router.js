import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import apps from '../apps';

import App from './App';
import Examples from './Examples';
import NotFound from './NotFound';

const appFactory = (title, component, serviceRequired = false) => ({ history: { location }}) =>
  <App title={title} component={component} location={location} serviceRequired={serviceRequired}/>

const appRoutes = Object.keys(apps).map((key) => ({
  path: `/${key}`,
  component: appFactory(apps[key].title, apps[key].component, true)
}));

const routes = [
  {
    path: '/',
    exact: true,
    component: appFactory('Visualization Apps', Examples)
  },
  ...appRoutes,
  {
    path: '/*',
    component: appFactory('App Not Found', NotFound)
  }
];

const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map((route, i) => <Route key={i} {...route} />)}
    </Switch>
  </BrowserRouter>
);

export default Router;
