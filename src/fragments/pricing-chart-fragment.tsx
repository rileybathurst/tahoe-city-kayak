import { graphql } from "gatsby"

export const query = graphql`
  fragment pricingChartFragment on STRAPI_RENTAL_RATE {
    id
    item
    oneHour
    threeHour
    fullDay

    branches {
      slug
    }

    retail {
      slug
      sport {
        slug
      }
      brand {
        slug
      }
    }
  }
`
