import React from 'react';
import PropTypes from 'prop-types';

import PaddleIcon from '../images/paddle';

export const Link = ({ primary }) => {
  const mode = primary ? 'storybook-Link--primary' : 'storybook-Link--secondary';
  return (
    <>
      <a href="#">Link</a><br />
      <a href="#" className='link__backed'>Link Backed</a>
      <a href="#" className='link__backed link__backed--hover'>Link Backed Hover</a>
    </>
  );
};

Link.propTypes = {
  primary: PropTypes.bool,
};

Link.defaultProps = {
  primary: false,
};
