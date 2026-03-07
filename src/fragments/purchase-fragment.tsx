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
    weight
    demo

    brand {
      slug
    }

    sport {
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