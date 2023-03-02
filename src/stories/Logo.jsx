import React from 'react';
import PropTypes from 'prop-types';

import PaddleIcon from '../images/paddle';

export const Logo = ({ primary }) => {
  const mode = primary ? 'storybook-Logo--primary' : 'storybook-Logo--secondary';
  return (
    <header>
      <div className="logo-container">
        <PaddleIcon className="paddle--left" />
        <h1 className='logo'><a href="/" className="link__subtle">Tahoe City<br /> Kayak</a></h1>
      </div>
    </header>
  );
};

Logo.propTypes = {
  primary: PropTypes.bool,
};

Logo.defaultProps = {
  primary: false,
};
