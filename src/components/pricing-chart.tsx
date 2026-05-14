import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { PaddlePricingChart } from "@rileybathurst/paddle"

const PricingChart = () => {

  const data = useStaticQuery(graphql`
    query PricingChartQuery {
      allStrapiRentalRate(filter: {favorite: {eq: true}}) {
        nodes {
          ...pricingChartFragment
        }
      }
      strapiBranch(slug: {eq: "tahoe-city"}) {
        slug
      }
    }
  `)

  // console.log(data.strapiBranch)

  return (
    <PaddlePricingChart
      rentalRates={data.allStrapiRentalRate}
      branches={data.strapiBranch}
    />
  )
}

export default PricingChart
