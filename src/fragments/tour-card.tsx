import { graphql } from "gatsby";

export const query = graphql`
  fragment tourCard on STRAPI_TOUR {
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
    featured

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

/* (
  breakpoints: [111, 165, 222, 444, 880]
  width: 222
) */
