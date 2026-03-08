// * discount has been removed as its not used on anything and breaks the query

import { graphql } from "gatsby"

export const query = graphql`
  fragment brandedFragment on STRAPI_RETAIL {
    ...purchaseFragment
    brand {
      id
      slug
      svg
    }
  }
`