import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image"
import { useStrapiMahaliaCasual } from "../hooks/use-strapi-mahalia-casual";

const TwoKayakers = (props) => {

  const { title, image } = useStrapiMahaliaCasual()

  return (
    <GatsbyImage
      // src="../images/tck-slide-2.webp"
      // src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/tck-slide-2.jpg"
      image={image?.localFile?.childImageSharp?.gatsbyImageData}
      alt={title}
      className={`img__wrapped ${props.className}`}
    />
  )
};

export default TwoKayakers;