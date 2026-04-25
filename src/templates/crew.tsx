// TODO: this is defintley not a template it needs to be moved

import React from 'react';
import { graphql } from 'gatsby';
import { SEO } from '../components/seo';
import AttributeView from '../views/attribute-view';
import type { AttributeViewTypes } from '../types/attribute-view-types';

// * these have to be specific as you cant do null variables in gatsby
const CrewView = ({ data }: { data: AttributeViewTypes }) => {
  return (
    <AttributeView
      {...data}
    />
  );
};

export default CrewView;

// TODO: title needs the sport reinstated
// TODO: breadcrumbs
export const Head = ({ data }: { data: AttributeViewTypes }) => {
  return (
    <SEO
      title={data.strapiAttribute.name}
      description={data.strapiAttribute.description.data.description}
    />
  );
}

export const query = graphql`
  query(
    $name: String!,
    $sport: String!,
    $crew: String!
  ) {
    allStrapiRetail(
      filter: {
        crew: { eq: $crew },
        sport: { slug: {eq: $sport} }
      },
      sort: { featured: ASC }
    ) {
      nodes {
        ...CardRetailFragment
      }
    }

    strapiAttribute(
      name: { eq: $name }
    ) {
      ...attributeFragment
    }
  }
`;
