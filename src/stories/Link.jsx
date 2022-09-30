import React from 'react';
import PropTypes from 'prop-types';

import PaddleIcon from '../images/paddle';

export const Link = ({ primary, hover }) => {
  const mode = primary ? 'storybook-Link--primary' : 'storybook-Link--secondary';
  const hove = hover ? 'link__backed--hover' : 'test';
  
  return (
    <>
      <a href="#">Link</a><br />
      <a href="#" className={`link__backed ${hove}`}>Link Backed</a>
      {/* <a href="#" className='link__backed '>Link Backed Hover</a> */}
    </>
  );
};

Link.propTypes = {
  primary: PropTypes.bool,
  hover: PropTypes.bool,
};

Link.defaultProps = {
  primary: false,
  hover: false,
};
