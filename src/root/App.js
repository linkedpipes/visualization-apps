import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import NavigationBar from './NavigationBar';
import Service from './Service';

import './App.css';

const App = ({ location, component: Component, title, serviceRequired }) => (
  <div className="App">
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <NavigationBar title={title} />
    <main>
      {serviceRequired
        ? <Service location={location} component={Component} />
        : <Component />
      }
    </main>
  </div>
);

App.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  serviceRequired: PropTypes.bool.isRequired
};

App.defaultProps = {
  serviceRequired: false
};

export default App;
