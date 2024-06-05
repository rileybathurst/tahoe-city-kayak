// * this is the tour lesson version of a card
// ? should this have a sport always displayed?

import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image"
import Time from "./time"
import Fitness from "./fitness"
import { PaddleTime } from "@rileybathurst/paddle";

const Ticket = (tour: {
  tour: {
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
  };
}) => {

  console.log(tour);

  const time = PaddleTime({
    start: tour.tour.start,
    finish: tour.tour.finish,
    duration: tour.tour.duration,
    timeframe: tour.tour.timeframe,
  });

  return (
    <Link
      // * there are going to be challenges like even the link is different
      to={`/tours-lessons/${tour.tour.slug}`}
      className="card"
    >
      <GatsbyImage
        image={tour.tour?.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
        alt={tour.tour?.ogimage?.alternativeText}
        className="card__image"
      />
      <h4 className="card__title">
        {tour.tour.name}
      </h4>
      <div className="card__specs">
        <h4>{time.entry}</h4>
        <Fitness fitness={tour.tour.fitness} />
      </div>
      <hr />
      <p>{tour.tour.excerpt}</p>
      <hr />
      <div className="card__details">
        <h5>${tour.tour.price}</h5>
        <a
          href={tour.tour.peek}
          className="book-now"
        >
          BOOK NOW
        </a>
      </div>
    </Link>
  )
}

export default Ticket
