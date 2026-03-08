// * discount has been removed as its not used on anything and breaks the query

import { graphql } from "gatsby"

export const query = graphql`
  fragment purchaseFragment on STRAPI_RETAIL {
    id
    title
    slug
    excerpt
    length
    width
    inflatable
    capacity
    demo

    brand {
      id
      name
      slug
    }

    sport {
      id
      title
      slug
    }

    cutout {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      alternativeText
    }

  }
`