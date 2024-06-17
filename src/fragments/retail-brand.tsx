import { graphql } from "gatsby"

export const query = graphql`
  fragment retailBrand on STRAPI_BRAND {
    id
    name
    slug
    tagline
    svg
  }
`