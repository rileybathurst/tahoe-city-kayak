import { graphql } from "gatsby"

export const query = graphql`
  fragment locationCard on STRAPI_LOCATION {
    name
    link
    svg
    opening_time
    closing_time

    address {
      data {
        address
      }
    }

    description {
      data {
        description
      }
    }
  }
`
