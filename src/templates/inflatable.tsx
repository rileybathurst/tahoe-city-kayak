import React from 'react';
import { graphql } from 'gatsby';
import AttributeView from '../views/attribute-view';

function Console(props) {
  console.log(props.log);
  return null;
}

const InflatableView = ({ data }) => {
  return (
    <>
      {/* <Console log={data} /> */}
      <AttributeView
        title={data.strapiAttribute.name}
        description={data.strapiAttribute.description.data.description}
        query={data.allStrapiRetail}
        type={data.strapiAttribute.type}
      />
    </>
  );
};

export default InflatableView;

export const query = graphql`
  query (
    $name: String!,
    $type: String!,
    $inflatable: Boolean!,
  ) {
    allStrapiRetail(filter: {inflatable: {eq: $inflatable}, type: {eq: $type}}) {
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
