import React from 'react';
import PropTypes from 'prop-types';

export const Simple = ({ primary }) => {
  const mode = primary ? 'storybook-Simple--primary' : 'storybook-Simple--secondary';
  return (
    <>
      Simple
    </>
  );
};

Simple.propTypes = {
  primary: PropTypes.bool,
};

Simple.defaultProps = {
  primary: false,
};