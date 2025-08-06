import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"

const Hero2025 = ({ className }: { className?: string; }) => {

  const { strapiImagegrab } = useStaticQuery(graphql`
      query {
        strapiImagegrab(title: {eq: "hero2025"}) {
          image {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }
        }
      }
    `)

  return (
    <GatsbyImage
      image={strapiImagegrab.image.localFile.childImageSharp.gatsbyImageData}
      alt={strapiImagegrab.image.alternativeText || "Hero Image 2025"}
      className={`img__wrapped ${className}`}
      objectPosition="0 -10rem" // * guess and check
    />
  )
};

export default Hero2025;