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
      <div
        style={{
          height: '100px',
          width: 'var(--pelican)',
          marginInline: 'auto',
          marginBlockEnd: '1rem',
          color: 'white',
          display: 'flex',
          flexFlow: 'row wrap',
          gap: '1rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--mullen-300)',
            flex: '1 1 29rem',
          }}
        >vulture-split?</div>
        <div
          style={{
            backgroundColor: 'var(--mullen-300)',
            flex: '1 1 29rem',
          }}
        >vulture-split?</div>

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