import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { PaddleFormatPhoneNumber } from "@rileybathurst/paddle"

const Phone = () => {

  const { strapiLocale } = useStaticQuery(graphql`
    query PhoneQuery {
      strapiLocale(slug: {eq: "tahoe-city"}) {
        phone
      }
    }
  `)

  return (
    <a
      href={`tel:${strapiLocale.phone}`}
      rel="norel norefferer"
      className="button"
    >
      Phone: <PaddleFormatPhoneNumber phoneNumberString={strapiLocale.phone} />
    </a>
  )
}

export default Phone
