// ! test file

import React from 'react';
import { graphql } from 'gatsby';

const Test = ({ data }) => {

  // const brand = data.strapiBrand

  return (
    <>
      <h1>{data.strapiBrand.name}</h1>
    </>
  );
};

export const testQuery = graphql`
    query ($slug: String!) {
      strapiBrand(slug: {eq: $slug}) {
        name
      }
    }
`;

export default Test;
