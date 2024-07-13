import React from 'react';
import { graphql } from 'gatsby';
import { SEO } from '../components/seo';
import AttributeView from '../views/attribute-view';

const WeightView = ({ data }) => {
  return (
    <AttributeView
      {...data}
    />
  );
};

export default WeightView;

export const Head = ({ data }) => {
  return (
    <SEO
      title={data.strapiAttribute.name}
      description={data.strapiAttribute.description.data.description}
    />
  );
}


// * GraphQL float not number
export const query = graphql`
  query (
    $slug: String!,
    $sport: String!,
    $weight: Float!,
    $crew: String!,
  ) {
    allStrapiRetail(filter: {
      sport: {slug: {eq: $sport}}
      hullweight: {lt: $weight},
      crew: {eq: $crew}
      },
      sort: {featured: ASC}) {
      nodes {
        ...attributeRetailFragment
      }
    }

    strapiAttribute(slug: {eq: $slug}) {
      ...attributeFragment
    }
  }
`;
