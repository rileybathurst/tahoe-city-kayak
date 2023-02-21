// ! test file

import React from 'react';
import { graphql } from 'gatsby';

const Test = ({ data }) => {

  // const brand = data.strapiBrand

  return (
    <>
      <h1>{data.strapiBrand.name}</h1>
      {data.strapiBrand.id}<br />
      one two three
    </>
  );
};

export const testQuery = graphql`
    query ($slug: String!) {
      strapiBrand(slug: {eq: $slug}) {
        name
        id
      }
    }
`;

export default Test;
