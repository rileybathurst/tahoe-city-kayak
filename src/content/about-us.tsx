import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const AboutUs = () => {

  // * this needs a messy query due to blocks on strapi
  const { strapiBranch } = useStaticQuery(graphql`
    query AboutQuery {
      strapiBranch(slug: {eq: "tahoe-city"}) {
        about {
          type
          children {
            type
            children {
              text
              type
            }
          }
        }
      }
    }
  `)

  return (
    <BlocksRenderer content={strapiBranch.about} />
  )
}

export default AboutUs