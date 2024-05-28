// this is the Name.jsx file
import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ primary }) => {
  const mode = primary ? 'storybook-Button--primary' : 'storybook-Button--secondary';
  return (
    <>
      <button type='button'>Button</button>
      <button className='button__hover' type='button'>Hover</button>
      <button className='button__active' type='button'>Active</button>
      <hr />
      <button className='button__mullen' type='button'>Button Mullen</button>
      <button className='button__mullen--hover' type='button'>Mullen Hover</button>
      <button className='button__mullen--active' type='button'>Mullen Active</button>
      <p>// TODO: I have some problems with this I dont like the pink</p>
    </>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
};