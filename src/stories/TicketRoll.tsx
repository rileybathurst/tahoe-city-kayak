// this is the Name.tsx file
import React from 'react';
import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';
import { Ticket } from './Ticket';

function Many() {

  const roll = faker.number.int(10);
  console.log(roll);

  if (roll < 1) {
    return (
      <h1>There are no tickets available</h1>
    );
  }

  const content = [];
  for (let i = 0; i < roll; i++) {
    content.push(
      <Ticket key={i} />
    );
  }

  return content;
}

export const TicketRoll = ({ primary }) => {
  const mode = primary ? 'storybook-TicketRoll--primary' : 'storybook-TicketRoll--secondary';

  return (
    <main className='ticket-roll'>
      <Many />
    </main>
  );
};

TicketRoll.propTypes = {
  primary: PropTypes.bool,
};

TicketRoll.defaultProps = {
  primary: false,
};