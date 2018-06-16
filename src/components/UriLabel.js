import React from 'react';
import PropTypes from 'prop-types';

const getClassName = id => {
  const  n = id.lastIndexOf('/');
  const  m = id.lastIndexOf('#');
  return id.substring(Math.max(n, m) + 1);
}

const UriLabel = ({ uri }) => {
  const name = getClassName(uri);
  return (
    <a href={uri} title={uri} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  );
}

UriLabel.propTypes = {
  uri: PropTypes.string.isRequired
}

export default UriLabel;