import React from 'react';
import PropTypes from 'prop-types';

import { Location } from './Location';

export const Location__Multiple = ({ primary }) => {
const mode = primary ? 'storybook-Location__Multiple--primary' : 'storybook-Location__Multiple--secondary';
return (
<section className='location__multiple'>
  <Location />
  <Location />
  <Location />
</section>
);
};

Location__Multiple.propTypes = {
primary: PropTypes.bool,
};

Location__Multiple.defaultProps = {
primary: false,
};