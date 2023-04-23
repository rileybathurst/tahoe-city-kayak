import React from 'react';
import { graphql } from 'gatsby';

const FeatureView = ({ data }) => {
  return (
    <>
      Hey
      {data.strapiFeature.name}
    </>
  );
};

export default FeatureView;

export const query = graphql`
  query (
    $name: String!,
  ) {
    strapiFeature(name: {eq: $name}) {
      name
    }
  }
`;
