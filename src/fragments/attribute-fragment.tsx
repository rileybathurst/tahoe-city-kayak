import { graphql } from "gatsby"

export const query = graphql`
  fragment attributeFragment on STRAPI_ATTRIBUTE {
    name
    description {
      data {
        description
      }
    }
  }
`
