import * as React from "react"
import { graphql } from "gatsby"
import TourView from "../../views/tour-view"

export const query = graphql`
  query TourQuery($slug: String!) {
    strapiTour(slug: { eq: $slug }) {
      id
      name
      childStrapiTourInformationTextnode {
        information
      }
      start
      finish
      duration
      minimum
      fitness
      peek
      sport
      excerpt
      price
      slug

      ogimage {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }

    allStrapiTour(filter: {slug: {nin: [$slug] }}) {
      nodes {
        name
        slug
        excerpt
        start
        finish
        duration
        fitness
        price
        peek

        ogimage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
    }
  }
`

const TourPage = ({ data }) => {
  const tour = data.strapiTour;
  const other = data.allStrapiTour;
  return (
    <TourView
      tour={tour}
      other={other}
    />
  );
};

export default TourPage;
