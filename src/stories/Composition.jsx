// this is the Name.jsx file
import React from 'react';
import PropTypes from 'prop-types';

export const Composition = ({ primary }) => {
const mode = primary ? 'storybook-Composition--primary' : 'storybook-Composition--secondary';
  return (
    <div className='Composition'>

      <div className='paddler'>
        paddler<br />
        // takes the place of retail cutout on a Composition
      </div>

      <div className='t1'>
        texture one
      </div>

      <div className="t2">
        texture two<br />
        whats the difference here for this to texture
      </div>

      Composition
      is maybe when its used outside of cards?

    </div>
  );
};

Composition.propTypes = {
primary: PropTypes.bool,
};

Composition.defaultProps = {
primary: false,
};