// this is the Name.jsx file
import React from 'react';
import PropTypes from 'prop-types';

export const TopBar = ({ primary, shown }) => {
  const mode = primary ? 'storybook-TopBar--primary' : 'storybook-TopBar--secondary';
  const hidden = shown ? 'shown' : 'hidden';

  return (
    <header>
    <div className={`top-wrapper ${hidden}`}>
      <div className="top-bar">
        <p>We are currently OPEN for 2022’s rental season.</p>
      </div>
      {/* close */}
      <button className="season">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48'><path d="m24 31.4 7.3-7.3-2.1-2.1-3.7 3.7v-9.1h-3v9.1L18.8 22l-2.1 2.1ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
      </button>

      {/* open */}
      {/* this has to be full width */}
      {/* <button className="reseason">&nbsp;</button> */}
      <button className="reseason">{/* stay gold */}</button>
    </div>
    </header>
  );
};

TopBar.propTypes = {
  primary: PropTypes.bool,
  shown : PropTypes.bool,
};

TopBar.defaultProps = {
  primary: false,
  shown : false,
};
