import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Markdown from "react-markdown"

const AboutUs = () => {

  const { strapiBranch } = useStaticQuery(graphql`
    query AboutQuery {
      strapiBranch(slug: {eq: "tahoe-city"}) {
        about {
          data {
            about
          }
        }
      }
    }
  `)

  return (
    <Markdown>{strapiBranch.about.data.about}</Markdown>
  )
}

export default AboutUs