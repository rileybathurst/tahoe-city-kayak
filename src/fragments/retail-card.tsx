import { graphql } from "gatsby"

export const query = graphql`
  fragment retailCard on STRAPI_RETAIL {
    id
    title
    slug
    excerpt
    type
    length
    width
    inflatable
    hullweight
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

/* (
  breakpoints: [111, 165, 222, 444, 880]
  width: 222
) */
