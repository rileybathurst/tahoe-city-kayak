import React from 'react';
import PropTypes from 'prop-types';

import BookNow from '../components/peek/book-now';

// I cant name cards inside of cards
function Caz() {
  return (
    <>
      <div className="card">
        <img
        src='https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leung-Oc81QL8Crtg-unsplash-hd.webp'
        className='card__placeholder'
        />
        <h4 className="card__title">
          <a href="/">
            Card Title
          </a>
        </h4>

        <div className="card__specs">
          <h4>
            <time dateTime="18:30">
            18:30 - 20:30
            </time>
          </h4>
          <h4>
            easy <span className="card__span">Fitness</span>
          </h4>
        </div>
        <hr />
        <p>Kayaking the lake at dusk is always a magical experience. Imagine yourself gliding across the clear waters of Lake Tahoe.</p>
        <hr />
        <div className="card__details">
          <h5>$75</h5>
          <BookNow />
        </div>
      </div>
    </>
  )
}

export default Caz

export const Card = ({ primary }) => {
  const mode = primary ? 'storybook-Card--primary' : 'storybook-Card--secondary';
  return (
    <>
    <div className="deck">
      <Caz />
      <Caz />
    </div>
  
    <p>
      Notes: card title is a h3 aka 2rem<br />
      specs and details are h4 aka 1.5rem<br />
    </p>
    </>
  );
};

Card.propTypes = {
  primary: PropTypes.bool,
};

Card.defaultProps = {
  primary: false,
};