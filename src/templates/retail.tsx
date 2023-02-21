// ! test file

import React from 'react';
import { graphql } from 'gatsby';

const Retail = ({ data }) => {

  // const brand = data.strapiBrand

  return (
    <>
      <h1>{data.strapiRetail.title}</h1>
      {data.strapiRetail.price}<br />
      one two three
    </>
  );
};

export const testQuery = graphql`
    query ($slug: String!) {
      strapiRetail(slug: {eq: $slug}) {
        title
        price
      }
    }
`;

export default Retail;
