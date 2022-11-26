import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          image
          url
          siteUrl
          name
          openingHours
          telephone

          location {
            address {
              streetAddress
              addressLocality
              addressRegion
              postalCode
            }
          }

          geo {
            latitude
            longitude
            geoRadius
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}