// ? Is there a way to get rid of the retail.retail.?

import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import TextureBackgrounds from "./texturebackgrounds"
import Remainder from "./remainder"

const Card = (retail: {
  retail: {
    id: React.Key;
    type: string;
    slug: string;
    title: string;
    excerpt: string;
    cutout: {
      localFile: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
      alternativeText: string;
    };
    length: number;
    width: number;
    capacity: number;
  };
}) => {

  // console.log(retail)

  return (
    <article
      key={retail.retail.id}
      className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <Link to={`/retail/${retail.retail.type}/${retail.retail.slug}`} className="image-link">
          <GatsbyImage
            image={retail.retail.cutout?.localFile?.childImageSharp?.gatsbyImageData}
            alt={retail.retail.cutout?.alternativeText}
            className="cutout"
            objectFit="contain"
          />
        </Link>
      </div>
      {/* // ? does this need a brand */}
      <h4 className="card__title">
        <Link to={`/retail/${retail.retail.type}/${retail.retail.slug}`}>
          {retail.retail.title}
        </Link>
      </h4>
      <hr />
      <p>{retail.retail.excerpt}</p>
      <hr />
      <div className="card__details">
        <h4><Remainder inches={retail.retail.length} /> long by {retail.retail.width}" wide</h4>
        <h5 className="capitalize">Capacity {retail.retail.capacity}lbs</h5>
      </div>
    </article>
  )
}

export default Card
