// this is the Name.jsx file
import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ primary }) => {
  const mode = primary ? 'storybook-Button--primary' : 'storybook-Button--secondary';
  return (
    <>
      <button>Button</button>
      <button className='button__hover'>Hover</button>
      <button className='button__active'>Active</button>
      <hr />
      <button className='button__mullen'>Button Mullen</button>
      <button className='button__mullen--hover'>Mullen Hover</button>
      <button className='button__mullen--active'>Mullen Active</button>
      <p>I have some problems with this I dont like the pink</p>
    </>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
};