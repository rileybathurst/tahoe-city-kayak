import * as React from "react"
import { Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"

import WaterTexture from "../images/watertexture";
import Remainder from "../components/remainder";

const SupBrandCard = (props) => {
  return (
    <article key={props.id} className="card">
      <div className="card-collage">
        <WaterTexture className="card__placeholder" />
        <GatsbyImage
          image={props.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={props?.cutout?.alternativeText}
          className="cutout"
        />
      </div>
      <h4 className="card__title">
        <Link to={`/retail/${props.slug}`}>
          {props.title}
        </Link>
      </h4>
      <hr />
      <p>{props.excerpt}</p>
      <hr />

      {/* // TODO: these need to change and maybe need to be intergrated */}
      {/* // ? thickness and volume I think? build these out maybe */}

      <div className="card__details">
        <h4><Remainder inches={props.length} /> tall by {props.width}" wide</h4>
        <h5 className="capitalize">Capacity {props.capacity}lbs</h5>
      </div>
    </article>
  )
}

export default SupBrandCard
