{/* This isnt for standalone as it needs wrapping in a .deck */ }

import React from 'react';
import PropTypes from 'prop-types';

// import BookNow from '../components/peek/book-now';

interface CardProps {
  label: string;
  primary: boolean;
}

export const Card = (Card: CardProps) => {

  console.log(Card);

  return (
    <div className="card">
      <img
        src='https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leung-Oc81QL8Crtg-unsplash-hd.webp'
        alt=""
        className='card__placeholder'
      />
      <h4 className="card__title">
        <a href="/">
          {Card.label}
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
        {/* <BookNow /> // TODO: this was coming from the src not a story */}
      </div>
    </div>
  );
};

Card.propTypes = {
  primary: PropTypes.bool,
  label: PropTypes.string,
};
