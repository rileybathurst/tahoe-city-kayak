import { graphql } from "gatsby";

// these have to be on a specific type
export const query = graphql`
  fragment cardFragment on STRAPI_TOUR {
    id
    name
    slug
    price
    peek
    excerpt
    start
    finish
    duration
    timeframe
    fitness
    sport
    order

    ogimage {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      alternativeText
    }
  }
`;
