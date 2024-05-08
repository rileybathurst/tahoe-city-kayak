// this is the Name.tsx file
// TODO: Yes I know I should do this programatically

import React from 'react';
import PropTypes from 'prop-types';

import "./color.css";

function ColorCard({ color, variables }) {
  // console.log('variables', variables);

  return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: '1rem',
      }}
    >
      {variables.map((variable) => (
        <div className={`color-card ${color}-${variable}`} >
          {color} - {variable}
          <div
            style={{
              height: '100px',
              width: '100px',
              backgroundColor: `var(--${color}-${variable})`,
            }}
          >
            {/* stay gold */}
          </div>

        </div>
      ))}
    </section>
  );
}

export const Color = ({ primary }) => {
  const mode = primary ? 'storybook-Color--primary' : 'storybook-Color--secondary';
  return (
    <main className='storybook-Color'>

      <h1>Color</h1>
      <h2>Tahoe City</h2>

      <ColorCard color="mullen" variables={[100, 200, 300]} />
      <ColorCard color="sand" variables={[100, 150, 200, 300]} />
      <ColorCard color="ink" variables={[100, 200, 300]} />

      <h2>South Lake</h2>

      <ColorCard color="navy" variables={[200, 300, 400, 500, 600]} />
      <ColorCard color="sunshine" variables={[100, 200, 300]} />

    </main>
  );
};

Color.propTypes = {
  primary: PropTypes.bool,
};

Color.defaultProps = {
  primary: false,
};