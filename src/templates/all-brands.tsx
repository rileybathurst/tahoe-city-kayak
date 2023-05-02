// ? is the problem I need to be splitting really early and not sure if i can do that

import React from "react"
import { graphql } from 'gatsby'

const BrandsView = () => {
  return (
    <>
      🦄
    </>
  );
};

export default BrandsView;

export const query = graphql`
  query (
    $slug: String!,
    # $type: String!,
  ) {
    brand: strapiBrand(slug: {eq: $slug}) {
      name
    }
  }
`