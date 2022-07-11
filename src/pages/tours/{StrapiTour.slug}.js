import * as React from "react"
import { graphql } from "gatsby"
import TourView from "../../views/tour-view"

export const query = graphql`
  query TourQuery($slug: String!) {
    strapiTour(slug: { eq: $slug }) {
      id
      name
      information {
        data {
          information
        }
      }
      start
      finish
      duration
      minimum
      fitness
      peek
    }

    allStrapiTour(filter: {slug: {nin: [$slug] }}) {
      nodes {
        name
        slug
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
