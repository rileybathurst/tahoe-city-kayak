// this is the Name.tsx file
import React from 'react';
import PropTypes from 'prop-types';

export const Eyebrow = ({ primary }) => {
  const mode = primary ? 'storybook-Eyebrow--primary' : 'storybook-Eyebrow--secondary';
  return (
    <hgroup className='crest'>
      {/* // ? is crest right? */}
      <p className='brow'>Eyebrow</p>
      <h3 className='supra'>Supra</h3>
    </hgroup>
  );
};

Eyebrow.propTypes = {
  primary: PropTypes.bool,
};

Eyebrow.defaultProps = {
  primary: false,
};