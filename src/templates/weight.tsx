import React from 'react';
import { graphql } from 'gatsby';
import AttributeView from '../views/attribute-view';

function Console(props) {
  console.log(props.log);
  return null;
}

const WeightView = ({ data }) => {
  return (
    <AttributeView
      title={data.strapiAttribute.name}
      description={data.strapiAttribute.description.data.description}
      query={data.allStrapiRetail}
      type={data.strapiAttribute.type}
    />
  );
};

export default WeightView;

// * GraphQL is apparently float not number
export const query = graphql`
  query (
    $slug: String!,
    $type: String!,
    $weight: Float!,
    $crew: String!,
  ) {
    allStrapiRetail(filter: {
      type: {eq: $type}
      hullweight: {lt: $weight},
      crew: {eq: $crew}
      }) {
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

    strapiAttribute(slug: {eq: $slug}, type: {eq: $type}) {
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
