import React from 'react';
import PropTypes from 'prop-types';

import PaddleIcon from '../images/paddle';
import FacebookIcon from '../images/facebook';
import InstagramIcon from '../images/instagram';
import PricingChart from '../components/pricing-chart';
import BookNow from '../components/peek/book-now';

export const Footer = ({ primary }) => {
  const mode = primary ? 'storybook-Footer--primary' : 'storybook-Footer--secondary';
  return (
    <footer>
      <PaddleIcon />
      <div className='logo-copy'>
        <h3 className='logo'><a href="/" className="a__subtle">Tahoe City Kayak</a></h3>
        <h4 className='copy'>&copy; {new Date().getFullYear()}</h4>
        <nav className="">
          <ul>
            <li><a href="/rentals-demos" className='a__backed'>Rentals &amp; Demos</a></li>
            <li><a href="/tours-lessons" className='a__backed'>Tours &amp; Lessons</a></li>
            <li><a href="/retail" className='a__backed'>Retail</a></li>
            <li><a href="/about" className='a__backed'>More Info</a></li>
            <li><BookNow /></li>
        </ul>
        </nav>
        <hr />
        <p><a href="phone:(530) 581-4336" rel="norel norefferer">Phone: (530) 581-4336</a></p>
        <p><a href="mailto:tahoecitykayak@gmail.com" rel="norel norefferer">tahoecitykayak@gmail.com</a></p>
        <hr />
        <div className="social">
          <a href="https://www.facebook.com/pages/Tahoe-City-Kayak/125337723736" target='_blank' rel='noopener noreferrer'>
            <FacebookIcon />
          </a>
          <a href="https://www.instagram.com/tahoecitykayak/" target='_blank' rel='noopener noreferrer'>
            <InstagramIcon />
          </a>
        </div>
      </div>
      <PricingChart book="no" />
    </footer>
  );
};

Footer.propTypes = {
  primary: PropTypes.bool,
};

Footer.defaultProps = {
  primary: false,
};
