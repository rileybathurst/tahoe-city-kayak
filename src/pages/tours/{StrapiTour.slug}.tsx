import * as React from "react"
import { graphql } from "gatsby"
import TourView from "../../views/tour-view"

export const query = graphql`
  query TourQuery($slug: String!) {
    strapiTour(slug: { eq: $slug }) {
      id
      name
    }
  }
`

const TourPage = ({ data }) => {
  const tour = data.strapiTour;
  return (
    <TourView
      tour={tour}
    />
  );
};

export default TourPage;
