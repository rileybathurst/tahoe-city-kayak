import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Markdown from "react-markdown";

const AboutUs = () => {

  const { strapiLocale } = useStaticQuery(graphql`
    query AboutQuery {
      strapiLocale(slug: {eq: "tahoe-city"}) {
        about {
          data {
            about
          }
        }
      }
    }
  `)

  return (
    <Markdown
      children={strapiLocale.about.data.about}
    // className="react-markdown"
    />
  )
}

export default AboutUs