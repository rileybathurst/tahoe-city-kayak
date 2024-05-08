import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'

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
    <Markdown
      children={strapiExperience.text.data.text}
      className="react-markdown"
    />
  )
}

export default Experience