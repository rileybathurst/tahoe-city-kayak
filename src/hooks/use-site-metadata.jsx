import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          defaultDescription
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

          offerCatalog {
            itemOffered1
            itemOffered2
            itemOffered3
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}