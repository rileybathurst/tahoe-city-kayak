// ! still working

import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import TextureBackgrounds from "./texturebackgrounds"
import Remainder from "./remainder"

const Card = (retail) => {
  return (
    <article
      key={retail.kayak.id}
      className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <GatsbyImage
          image={retail.kayak.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={retail.kayak.cutout?.alternativeText}
          className="cutout"
        />
      </div>
      {/* // ? does this need a brand */}
      <h4 className="card__title">
        <Link to={`/retail/${retail.kayak.type}/${retail.kayak.slug}`}>
          {retail.kayak.title}
        </Link>
      </h4>
      <hr />
      <p>{retail.kayak.excerpt}</p>
      <hr />
      <div className="card__details">
        {/* // TODO: 'Remainder' cannot be used as a JSX component. */}
        <h4><Remainder inches={retail.kayak.length} /> long by {retail.kayak.width}" wide</h4>
        <h5 className="capitalize">Capacity {retail.kayak.capacity}lbs</h5>
        {/* // TODO: if no capacity */}
      </div>
    </article>
  )
}

export default Card
