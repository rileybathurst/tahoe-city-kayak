import React from 'react';
import PropTypes from 'prop-types';

import { Location_Card } from './Location_Card';

export const Location__Deck = ({ primary }) => {
const mode = primary ? 'storybook-Location__Deck--primary' : 'storybook-Location__Deck--secondary';
return (
<section className='Location__Deck'>
  <Location_Card />
  <Location_Card />
  <Location_Card />
</section>
);
};

Location__Deck.propTypes = {
primary: PropTypes.bool,
};

Location__Deck.defaultProps = {
primary: false,
};