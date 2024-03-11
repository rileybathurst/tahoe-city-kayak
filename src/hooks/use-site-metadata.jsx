import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          url
          description
          defaultDescription
          defaultImage
          defaultImageAlt
          openingHours
          telephone
          email
          paymentAccepted

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

          themeColor
          numberOfEmployees
          slogan

          social {
            facebook
            instagram
          }
          jobEmail
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
