// this is the Name.tsx file
import React from 'react';
import PropTypes from 'prop-types';

import "./color.css";

export const Color = ({ primary }) => {
  const mode = primary ? 'storybook-Color--primary' : 'storybook-Color--secondary';
  return (
    <>
      Color
      <div className='story-color navy'>navy</div>
      <div className='story-color sunshine'>sunshine</div>
    </>
  );
};

Color.propTypes = {
  primary: PropTypes.bool,
};

Color.defaultProps = {
  primary: false,
};