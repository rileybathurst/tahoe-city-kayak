import React from 'react';
import { graphql } from 'gatsby';

const OtherView = ({ data }) => {
  return (
    <>
      Other
      {data.strapiFeature.name}
    </>
  );
};

export default OtherView;

export const query = graphql`
  query (
    $name: String!,
  ) {
    strapiFeature(name: {eq: $name}) {
      name
    }
  }
`;
