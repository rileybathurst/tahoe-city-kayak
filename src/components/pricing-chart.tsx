import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { PaddlePricingChart } from "@rileybathurst/paddle"

const PricingChart = ({ book }: { book: boolean; }) => {

  const data = useStaticQuery(graphql`
    query PricingChartQuery {
      allStrapiRentalRate(filter: {favorite: {eq: true}}) {
        nodes {
          id
          item
          oneHour
          threeHour
          fullDay
        }
      }

      allStrapiRentalAddon {
        nodes {
          id
          name
          single
          double
          sup
        }
      }

      strapiLocale(slug: {eq: "tahoe-city"}) {
        name
        peek_base
      }

    }
  `)

  return (
    <PaddlePricingChart
      book={book}
      rentalRates={data.allStrapiRentalRate}
      rentalAddons={data.allStrapiRentalAddon}
      strapiLocaleName={data.strapiLocale.name}
      peek_base={data.strapiLocale.peek_base}
    />
  )
}

export default PricingChart
