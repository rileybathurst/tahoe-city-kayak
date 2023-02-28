import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"

const Kayaker = (props) => {

  const { strapiImagegrab } = useStaticQuery(graphql`
    query MyQuery {
      strapiImagegrab(title: {eq: "kayaker"}) {
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `)

  return (
    <GatsbyImage
      // src="../images/andy-paddling.webp"
      // image="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/andy-paddling.jpg"
      image={strapiImagegrab.image.localFile.childImageSharp.gatsbyImageData}
      alt="andy paddling in the sunshine" // TODO query this
      className={`img__wrapped ${props.className}`}
    // breakpoints={[300, 600, 900]}
    />
  );
};

export default Kayaker;