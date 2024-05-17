// this is the Name.tsx file
import React from 'react';
import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';

interface TimeProps {
  start: Date;
  finish: Date;
}
function Time({ start, finish }: TimeProps) {
  return (
    <h4>
      {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time */}
      <time dateTime={start}>
        {start.getHours()}:{start.getMinutes()}{faker.helpers.arrayElement(['am', 'pm'])} - {finish.getHours()}:{finish.getMinutes()}{faker.helpers.arrayElement(['am', 'pm'])}
        {/* <HourMin time={start} /> - <HourMin time={finish} /> */}
      </time>
    </h4>
  )
}

export const Ticket = ({ primary }) => {
  const mode = primary ? 'storybook-Ticket--primary' : 'storybook-Ticket--secondary';
  return (
    <section className="ticket">
      <a href={faker.location.city()}>
        <img
          src={faker.image.urlLoremFlickr()}
          alt={faker.lorem.sentence()}
          className='gatsby-image-wrapper stories-ticket-image'
        />
      </a>
      <h4 className="card__title">
        <a href={faker.location.city()}>
          {faker.location.city()}
        </a>
      </h4>
      <div className="card__specs">
        {faker.datatype.boolean() ?
          <Time
            start={faker.date.anytime()}
            finish={faker.date.anytime()}
          />
          :
          <h4>{faker.number.int(100)} mins</h4>
        }

        {/* <Fitness fitness={tour.fitness} /> */}
        {faker.helpers.arrayElement(['easy', 'medium', 'hard'])}
      </div>
      <hr />
      <p>{faker.lorem.sentence(20)}</p>
      <hr />
      <div className="card__details">
        <h5>${faker.number.int(100)}</h5>
        <a
          href={faker.location.city()}
          className="book-now"
        >
          BOOK NOW
        </a>
      </div>

    </section>
  );
};

Ticket.propTypes = {
  primary: PropTypes.bool,
};

Ticket.defaultProps = {
  primary: false,
};