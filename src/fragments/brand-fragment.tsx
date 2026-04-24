// * discount has been removed as its not used on anything and breaks the query
// * pulls in the svg for the brand if it exists, used on the index page and retail pages

import { graphql } from "gatsby"

export const query = graphql`
  fragment brandFragment on STRAPI_BRAND {
    id
    name
    slug
    svg
  }
`