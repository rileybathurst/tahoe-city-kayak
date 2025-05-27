// ? Is there a way to get rid of the retail.retail.?
// * there is also a ticket for tours and lessons similar to a card
// TODO: ranme this to purchase to go with ticket instead of card

import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image"
import TextureBackgrounds from "./texturebackgrounds"
import Remainder from "./remainder"
import type { RetailType } from "../types/retail"

interface NameTypes {
  name: string;
}
function Name({ name }: NameTypes) {
  return (
    <div className="badge">
      <h5 className="capitalize">{name}</h5>
    </div>
  )
}

interface BadgeTypes {
  inflatable: boolean;
  demo: boolean;
  // discount?: number;
}
function Badges({ inflatable, demo, discount }: BadgeTypes) {

  // TODO: deal with multiple
  if (discount) {
    return (
      <div className="badge">
        <h5 className="capitalize ruby">{discount}% off</h5>
      </div>
    )
  }

  if (inflatable) {
    return (
      <Name name="inflatable" />
    )
  }

  if (demo) {
    return (
      <Name name="demo" />
    )
  }

  return null
}

const Card = ({ id, title, sport, brand, slug, cutout, inflatable, demo, excerpt, length, width, capacity }: RetailType) => {
  // discount, was removed as currently we dont have it so it breaks the build

  if (cutout && process.env.NODE_ENV === "development") {
    if (!cutout.alternativeText) {
      console.warn(`${title} by ${brand.slug} doesnt have altText`)
    }
  }

  return (
    <article
      key={id}
      className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <Link
          to={`/retail/${sport.slug}/${brand.slug}/${slug}`}
          className="image-link"
        >
          <GatsbyImage
            image={cutout?.localFile?.childImageSharp?.gatsbyImageData}
            alt={cutout?.alternativeText || `${title} by ${brand.slug}`}
            className="cutout"
            objectFit="contain"
          // TODO: this has been causing some problems but keep an eye on it
          />
        </Link>
        <Badges
          inflatable={inflatable}
          demo={demo}
        // discount={discount}
        />
      </div>
      <h4 className="card__title">
        <Link to={`/retail/${sport.slug}/${brand.slug}/${slug}`}>
          {title}
        </Link>
      </h4>
      <hr />
      <p>{excerpt}</p>
      <hr />
      <div className="card__details">
        <h4>
          <Remainder inches={length} />
          long by {width}" wide
        </h4>
        <h5 className="capitalize">Capacity {capacity}&thinsp;lbs</h5>
      </div>
    </article >
  )
}

export default Card
