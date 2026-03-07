import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { PaddleBookNow, type PaddleBookNowTypes } from "@rileybathurst/paddle"

const BookNow = ({specificLink, specificName}: PaddleBookNowTypes) => {

  const { strapiBranch } = useStaticQuery(graphql`
    query BookNowQuery {
      strapiBranch(slug: {eq: "tahoe-city"}) {
        name
        peek_base
      }
    }
  `);

  return (
    <PaddleBookNow
      peek_base={strapiBranch.peek_base}
      strapiBranchName={strapiBranch.name}
      specificName={specificName}
      specificLink={specificLink}
    />
  )
}

export default BookNow
