import React from 'react';
import PropTypes from 'prop-types';

import PaddleIcon from '../images/paddle';

export const Menu = ({ primary }) => {
  const mode = primary ? 'storybook-Menu--primary' : 'storybook-Menu--secondary';
  return (
    <nav className="menu__large">
      <hr />
      <ul>
      <li><a href="/rentals-demos" className='link__backed'>Rentals &amp; Demos</a></li>
      <li><a href="/tours-lessons" className='link__backed'>Tours &amp; Lessons</a></li>
      <li><a href="/retail" className='link__backed'>Retail</a></li>
      <li><a href="/about" className='link__backed'>More Info</a></li>
      <li>    <a
      href="https://book.peek.com/s/6477fc17-231d-4d85-9a8e-a46e835d5e3b/aE2XR"
      rel="noopener noreferrer"
      className="book-now"
    >
      BOOK NOW
    </a></li>
    </ul>
      <hr />
    </nav>
  );
};

Menu.propTypes = {
  primary: PropTypes.bool,
};

Menu.defaultProps = {
  primary: false,
};
