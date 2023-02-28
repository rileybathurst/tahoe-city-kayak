import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"

// ? I might need to do this through a hook if its failing sometimes and that break the whole build in an unfindable way

import { useStrapiAndy } from "../hooks/use-strapi-andy";

const AndyPaddling = (props) => {

  console.log(useStrapiAndy);
  console.log({ useStrapiAndy });
  console.log(<useStrapiAndy />);

  /*   const { strapiImagegrab } = useStaticQuery(graphql`
      query MyQuery {
        strapiImagegrab(title: {eq: "andy"}) {
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
   */

  return (
    <>
      {/* {useStrapiAndy} */}
      {/*     <GatsbyImage
      // src="../images/andy-paddling.webp"
      // image="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/andy-paddling.jpg"
      image={strapiImagegrab?.image?.localFile?.childImageSharp?.gatsbyImageData}
      alt="andy paddling in the sunshine"
      // className={`img__wrapped ${props.className}`}
      // breakpoints={[300, 600, 900]}
  /> */}
    </>
  );
};

export default AndyPaddling;