// this is the Name.tsx file
import React from 'react';
import PropTypes from 'prop-types';

export const Compare = ({ primary }) => {
  const mode = primary ? 'storybook-Compare--primary' : 'storybook-Compare--secondary';
  return (
    <>
      Compare
    </>
  );
};

Compare.propTypes = {
  primary: PropTypes.bool,
};

Compare.defaultProps = {
  primary: false,
};