import { graphql } from "gatsby"

export const query = graphql`
  fragment pricingChartFragment on STRAPI_RENTAL_RATE {
    id
    item
    oneHour
    threeHour
    fullDay
    pedalAdd

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
