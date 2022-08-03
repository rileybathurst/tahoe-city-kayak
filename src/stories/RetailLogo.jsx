import React from 'react';
import PropTypes from 'prop-types';

export const RetailLogo = ({ primary }) => {
  const mode = primary ? 'storybook-RetailLogo--primary' : 'storybook-RetailLogo--secondary';
  return (
    <div className='brand-logo'>
      <svg width="10" height="10" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path
            d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
            id="a"
            fill="#999"
          />
        </g>
      </svg>
      <h2><a href="#">RetailLogo</a></h2>
    </div>
  );
};

RetailLogo.propTypes = {
primary: PropTypes.bool,
};

RetailLogo.defaultProps = {
primary: false,
};