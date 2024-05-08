// this is the Name.tsx file
import React from 'react';
import PropTypes from 'prop-types';


function ColorCard({ colors }) {

  return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: '1rem',
      }}
    >
      {colors.map((color) => (
        <div className={`color-card ${color}`} >
          {color}
          <div
            style={{
              height: '10rem',
              width: '10rem',
              backgroundColor: `var(--${color})`,
            }}
          >
            {/* stay gold */}
          </div>
        </div>
      ))}
    </section>
  );
}

export const Neutrals = ({ primary }) => {
  const mode = primary ? 'storybook-Neutrals--primary' : 'storybook-Neutrals--secondary';
  return (
    <>
      <h1>Neutrals</h1>
      <ColorCard colors={['brilliance', 'kingly-cloud', 'tin-soldier', 'grey', 'industrial-revolution', 'raven-black', 'black-out', 'black-metal']} />

    </>
  );
};

Neutrals.propTypes = {
  primary: PropTypes.bool,
};

Neutrals.defaultProps = {
  primary: false,
};