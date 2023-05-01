import React from 'react';
import { graphql } from 'gatsby';

const OtherView = ({ data }) => {
  return (
    <>
      Other
      {data.strapiAttribute.name}
    </>
  );
};

export default OtherView;

export const query = graphql`
  query (
    $name: String!,
  ) {
    strapiAttribute(name: {eq: $name}) {
      name
    }
  }
`;
