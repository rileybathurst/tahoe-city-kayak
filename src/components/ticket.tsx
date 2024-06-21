// * this is the tour lesson version of a card
// ? should this have a sport always displayed?

import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image"
import Fitness from "./fitness"
import { PaddleTime } from "@rileybathurst/paddle";

interface TicketTypes {
  id: React.Key;
  ogimage: { localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData; }; }; alternativeText: string; };
  slug: string;
  name: string;
  start?: string | null;
  finish?: string | null;
  duration?: number | null;
  timeframe?: string | null;
  fitness: string;
  excerpt: string;
  price: string;
  peek: string;
}

const Ticket = ({ id, ogimage, slug, name, start, finish, duration, timeframe, fitness, excerpt, price, peek }: TicketTypes) => {
  const time = PaddleTime({
    start: start,
    finish: finish,
    duration: duration,
    timeframe: timeframe,
  });

  return (
    <Link
      // * there are going to be challenges like even the link is different
      to={`/tours-lessons/${slug}`}
      className="card"
    >
      <GatsbyImage
        image={ogimage?.localFile?.childImageSharp?.gatsbyImageData}
        alt={ogimage?.alternativeText}
        className="card__image"
      />
      <h4 className="card__title">
        {name}
      </h4>
      <div className="card__specs">
        <h4>{time.entry}</h4>
        <Fitness fitness={fitness} />
      </div>
      <hr />
      <p>{excerpt}</p>
      <hr />
      <div className="card__details">
        <h5>${price}</h5>
        <a
          href={peek}
          className="book-now"
        >
          BOOK NOW
        </a>
      </div>
    </Link>
  )
}

export default Ticket
