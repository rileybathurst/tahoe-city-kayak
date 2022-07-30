import React from 'react';
import { graphql, StaticQuery } from 'gatsby'

function Aything(props) {
  console.log("here")
  console.log(props.retail)
  return null;
}

const RetailTypeView = ({ data }) => {
  return (
    <>
      {data.strapiRetail.title}


      {data.allStrapiRetail.edges.map(({ node }) => (
        <>
          <Aything retail={node} />
          {node.title}
        </>
      ))}
    </>
  );
};

export default RetailTypeView;

export const query = graphql`
  query RetailTemplate(
    $slug: String!,
    $type: String!,
  ) {
    strapiRetail(slug: {eq: $slug}) {
      id
      title
    }

    allStrapiRetail(filter: {type: {eq: $type}}) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
