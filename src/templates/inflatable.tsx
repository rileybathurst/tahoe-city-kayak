// TODO: needs rigid can be done with an attribute boolean
import React from 'react';
import { graphql } from 'gatsby';
import AttributeView from '../views/attribute-view';
import { SEO } from '../components/seo';

const InflatableView = ({ data }) => {
  return (
    <AttributeView
      {...data}
    />
  );
};

export default InflatableView;

export const Head = ({ data }) => {
  return (
    <SEO
      title={data.strapiAttribute.name}
      description={data.strapiAttribute.description.data.description}
    />
  );
}


export const query = graphql`
  query (
    $name: String!
    $sport: String!
    $inflatable: Boolean!
  ) {
    allStrapiRetail(
      filter: {
        inflatable: {eq: $inflatable},
        sport: {slug: {eq: $sport}}
      },
      sort: {featured: ASC}
    ) {
      nodes {
        ...attributeRetailFragment
      }
    }

    strapiAttribute(
      name: {eq: $name}
    ) {
      ...attributeFragment
    }
  }
`;
