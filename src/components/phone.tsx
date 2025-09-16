import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { PaddleFormatPhoneNumber } from "@rileybathurst/paddle"

const Phone = () => {

  const { strapiBranch } = useStaticQuery(graphql`
    query PhoneQuery {
      strapiBranch(slug: {eq: "tahoe-city"}) {
        phone
      }
    }
  `)

  return (
    <a
      href={`tel:${strapiBranch.phone}`}
      rel="norel norefferer"
      className="button"
    >
      Phone: <PaddleFormatPhoneNumber phoneNumberString={strapiBranch.phone} />
    </a>
  )
}

export default Phone
