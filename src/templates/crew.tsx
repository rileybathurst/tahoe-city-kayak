import React from 'react';
import { graphql } from 'gatsby';
import AttributeView from '../views/attribute-view';

// * these have to be specific as you cant do null variables

// * I tried using a useStaticQuery hook here but it didn't work
// If you're not using a page query but useStaticQuery you
// see this error because it doesn't support variables. To
// learn more about the limitations:
// https://gatsby.dev/use-static-query

const CrewView = ({ data }) => {

  return (
    <AttributeView
      title={data.strapiAttribute.name}
      description={data.strapiAttribute.description.data.description}
      query={data.allStrapiRetail}
      type={data.strapiAttribute.type}
    />
  );
};

export default CrewView;

export const query = graphql`
  query (
    $name: String!,
    $slug: String!,
    $type: String!,
  ) {
    allStrapiRetail(filter: {crew: {eq: $slug}, type: {eq: $type}}) {
      nodes {
        id
        title
        slug
        excerpt
        capacity
        length
        width
        type
        inflatable
        brand {
          slug
        }

        cutout {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
    }

    strapiAttribute(name: {eq: $name}, type: {eq: $type}) {
      name
      type
      description {
        data {
          description
        }
      }
    }
  }
`;
