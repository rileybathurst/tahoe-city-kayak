// I remeber why I hadn't done this originally theres a lot going on
// Can this be both tours and retail?

import * as React from "react"
import { Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

const Deck = (props: { cards: any }) => {
  const cards = props.cards.map((card: {
    id: string;
    title: string;

  }) => (
    <article
      className="card"
      key={card.id}
    >
      <Link to={`/tours-lessons/`}>
        <GatsbyImage
          // image={tour?.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
          // alt={tour?.ogimage?.alternativeText}
          className="card__image"
        />
      </Link>
      {/* // ? what h level should I be running here */}
      <h2 className="card__title">{card.title}</h2>
    </article>
  ))

  return (
    <section
      className="deck"
    >
      {cards}
    </section>
  )
}

export default Deck
