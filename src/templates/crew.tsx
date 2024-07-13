import React from 'react';
import { graphql } from 'gatsby';
import { SEO } from '../components/seo';
import AttributeView from '../views/attribute-view';

// * these have to be specific as you cant do null variables in gatsby
const CrewView = ({ data }) => {

  console.log(data)

  return (
    <AttributeView
      {...data}
    />
  );
};

export default CrewView;

// TODO: title needs the sport reinstated
// TODO: breadcrumbs
export const Head = ({ data }) => {
  return (
    <SEO
      title={data.strapiAttribute.name}
      description={data.strapiAttribute.description.data.description}
    />
  );
}

// ! slug has to be wrong?
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
      sort: { featured: ASC }) {
      nodes {
        ...attributeRetailFragment
      }
    }

    strapiAttribute(
      name: { eq: $name }
    ) {
      ...attributeFragment
    }
  }
`;
