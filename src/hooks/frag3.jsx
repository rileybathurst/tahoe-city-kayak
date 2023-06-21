import { graphql } from "gatsby"

// * this never has to be imported anywhere
export const query = graphql`
  fragment threeF on STRAPI_BRAND {
      name
      slug
    }
`