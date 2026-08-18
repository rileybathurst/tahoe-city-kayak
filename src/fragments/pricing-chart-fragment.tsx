import { graphql } from "gatsby"

export const query = graphql`
  fragment PricingChartFragment on STRAPI_RENTAL_RATE {
    id
    item
    oneHour
    threeHour
    fullDay

    branches {
      slug
    }
  }
`