{/* This isnt for standalone as it needs wrapping in a .deck */ }

import React from 'react';
import PropTypes from 'prop-types';
import { title } from 'process';

// import BookNow from '../components/peek/book-now';

export const Card = ({ primary, user, onLogin }) => {
  // const mode = primary ? 'storybook-Card--primary' : 'storybook-Card--secondary';

  // variables
  console.log(primary); // true false boolean
  console.log(title); // ? browser
  // console.log(label); // label is not defined
  // console.log({ label }); // label is not defined
  console.log(primary.label); // undefined
  console.log(primary.args)
  console.log(Card)
  // console.log({ emoji })
  // console.log(primary.args.emoji)

  // console.log(user); // null

  return (
    <>
      {/* <div className='deck'>needed for the styles */}
      <div className="card">
        <img
          src='https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leung-Oc81QL8Crtg-unsplash-hd.webp'
          className='card__placeholder'
        />
        <h4 className="card__title">
          <a href="/">
            {primary.label || 'Kayak at Dusk'}
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
      {/* <p>
        Notes: card title is a h3 aka 2rem<br />
        specs and details are h4 aka 1.5rem<br />
      </p> */}
      {/* </div> */}
    </>
  );
};

Card.propTypes = {
  // primary: PropTypes.bool,
  primary: PropTypes.shape({}),
  label: PropTypes.string,
  user: PropTypes.shape({}),
  onLogin: PropTypes.func.isRequired,
};

Card.defaultProps = {
  // primary: false,
  primary: null,
  label: 'card',
  /* 
    user: {
      name: 'John Doe',
    }, */


};