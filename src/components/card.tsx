// ? Is there a way to get rid of the retail.retail.?

import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import TextureBackgrounds from "./texturebackgrounds"
import Remainder from "./remainder"

function Name(props) {
  return (
    <div className="badge">
      <h5 className="capitalize">{props.name}</h5>
    </div>
  )
}

function Badges(props) {

  // console.log(props);

  // TODO: deal with multiple
  if (props.inflatable) {
    return (
      <Name name="inflatable" />
    )
  } else if (props.demo) {
    return (
      <Name name="demo" />
    )
  } else {
    return null
  }
}

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
    inflatable?: boolean;
    demo?: boolean;
  };
}) => {

  // console.log(retail)

  return (
    <article
      key={retail.retail.id}
      className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <Link
          to={`/retail/${retail.retail.type}/${retail.retail.slug}`}
          className="image-link"
        >
          <GatsbyImage
            image={retail.retail.cutout?.localFile?.childImageSharp?.gatsbyImageData}
            alt={retail.retail.cutout?.alternativeText}
            className="cutout"
            objectFit="contain"
          // TODO: this has been causing some problems but keep an eye on it
          />
        </Link>
        <Badges
          inflatable={retail.retail.inflatable}
          demo={retail.retail.demo}
        />
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
        <h4>
          <Remainder inches={retail.retail.length} />
          long by {retail.retail.width}" wide
        </h4>
        <h5 className="capitalize">Capacity {retail.retail.capacity}&thinsp;lbs</h5>
      </div>
    </article>
  )
}

export default Card
