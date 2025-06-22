import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Markdown from "react-markdown";

const Experience = () => {

  const { strapiExperience } = useStaticQuery(graphql`
    query ExperienceQuery {
      strapiExperience {
        text {
          data {
            text
          }
        }
      }
    }
  `)

  return (
    <Markdown>
      {strapiExperience.text.data.text}
    </Markdown>
  )
}

export default Experience