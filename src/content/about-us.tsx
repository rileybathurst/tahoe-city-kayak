import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Markdown from "react-markdown";

const AboutUs = () => {

  const { strapiAbout } = useStaticQuery(graphql`
    query AboutQuery {
      strapiAbout {
        text {
          data {
            text
          }
        }
      }
    }
  `)

  return (
    <Markdown
      children={strapiAbout.text.data.text}
      className="react-markdown"
    />
  )
}

export default AboutUs