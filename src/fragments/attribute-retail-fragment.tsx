import { graphql } from "gatsby"

export const query = graphql`
  fragment attributeRetailFragment on STRAPI_RETAIL {
    id
    title
    slug
    excerpt
    capacity
    length
    width
    sport {
      slug
    }
    inflatable
    
    brand {
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
