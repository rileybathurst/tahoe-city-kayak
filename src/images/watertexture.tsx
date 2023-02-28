import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"

const WaterTexture = (props) => {

  const { strapiImagegrab } = useStaticQuery(graphql`
    query MyQuery {
      strapiImagegrab(title: {eq: "WaterTexture"}) {
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
    <>
      <GatsbyImage
        // src="../images/jason-leung-Oc81QL8Crtg-unsplash-hd.webp"
        // src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leung-Oc81QL8Crtg-unsplash-hd.jpg"
        image={strapiImagegrab?.image?.localFile?.childImageSharp?.gatsbyImageData}
        alt="two kayakers paddling across lake Tahoe"
        className={`img__wrapped ${props.className}`}
      // breakpoints={[300, 600, 900]}
      />
      // TODO
    </>
  )
};

export default WaterTexture;