// this is the Name.tsx file
import React from 'react';
import PropTypes from 'prop-types';

function WidthCard({ widths }) {
  return (
    <>
      {widths.map((width) => (
        <div
          style={{
            height: '100px',
            width: `var(--${width})`,
            backgroundColor: 'var(--mullen-300)',
            marginInline: 'auto',
            marginBlockEnd: '1rem',
            color: 'white',
          }}
        >
          {width}
        </div>
      ))}
    </>
  );
}

export const Widths = ({ primary }) => {
  const mode = primary ? 'storybook-Widths--primary' : 'storybook-Widths--secondary';
  return (
    <>
      <h1>Widths</h1>
      <WidthCard widths={['swan', 'vulture', 'stork', 'condor', 'pelican', 'albatross']} />
      <hr />
      <h2>split</h2>
      <p>pelican hydra</p>
      <div
        className='pelican hydra'

        style={{
          height: '100px',
          marginBlockEnd: '1rem',
          color: 'white',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--mullen-300)',
          }}
        >hydra?</div>
        <div
          style={{
            backgroundColor: 'var(--mullen-300)',
          }}
        >hydra?</div>

      </div>


    </>
  );
};

Widths.propTypes = {
  primary: PropTypes.bool,
};

Widths.defaultProps = {
  primary: false,
};