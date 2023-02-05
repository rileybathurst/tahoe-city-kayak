import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../images/logo';
import FacebookIcon from '../images/facebook';
import InstagramIcon from '../images/instagram';
import PricingChart from '../components/pricing-chart';
import BookNow from '../components/peek/book-now';

export const Footer = ({ primary }) => {
  const mode = primary ? 'storybook-Footer--primary' : 'storybook-Footer--secondary';
  return (
    <footer>
      <div className='logo-copy'>
        <h3 className='sr-only'><a href="/">Tahoe City Kayak and Paddleboard</a></h3>
        {/* <a href="/"><Logo /></a> */}
        <p>&copy; {new Date().getFullYear()}</p>
        <hr />
        <nav>
          {/* <MenuList /> */}
        </nav>
        <hr />
        <div className="footer__contact">
          <a href="phone:(530) 581-4336" rel="norel norefferer" className="button">Phone: (530) 581-4336</a>
          <a href="mailto:tahoecitykayak@gmail.com" rel="norel norefferer" className="button">tahoecitykayak@gmail.com</a>
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
      </div>
      <div>
        <PricingChart book="no" />
        <hr />
        <section className="home__here" >
          {/* <Complete /> */}
        </section>
      </div>

    </footer >
  );
};

Footer.propTypes = {
  primary: PropTypes.bool,
};

Footer.defaultProps = {
  primary: false,
};
