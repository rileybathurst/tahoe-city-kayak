import React from 'react';
import { graphql } from 'gatsby';
import AttributeView from '../views/attribute-view';
import { SEO } from '../components/seo';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const PedalTemplate = ({ data }) => {
  return (
    <AttributeView
      {...data}
    />
  );
};

export default PedalTemplate;

export const Head = ({ data }) => {
  return (
    <SEO
      title={`${data.strapiAttribute.name} ${data.strapiAttribute.type}s | ${useSiteMetadata().title}`}
      description={data.strapiAttribute.description.data.description}
    />
  );
}


// TODO: this is grabbing the whole hobie brand
export const query = graphql`
  query (
    $slug: String!
  ) {
    allStrapiRetail(
      filter: {brand: {name: {eq: "hobie"}}},
      sort: {featured: ASC}) {
      nodes {
        ...attributeRetailFragment
      }
    }

    strapiAttribute(
      slug: {eq: $slug}
      ) {
      ...attributeFragment
    }
  }
`;
