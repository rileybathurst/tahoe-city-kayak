import React from 'react';
import { graphql } from 'gatsby';
import AttributeView from '../views/attribute-view';
import { SEO } from '../components/seo';
import { useSiteMetadata } from '../hooks/use-site-metadata';

// TODO: fix the sport to sup
import Sport from '../components/sport';

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

export const Head = ({ data }) => {
  return (
    <SEO
      title={`${data.strapiAttribute.name} ${data.strapiAttribute.type}s | ${useSiteMetadata().title}`}
      description={data.strapiAttribute.description.data.description}
    >
      {/* // TODO: breadcrumbs */}
    </SEO>
  );
}


export const query = graphql`
  query (
    $name: String!,
    $type: String!,
    $inflatable: Boolean!,
  ) {
    allStrapiRetail(filter: {inflatable: {eq: $inflatable}, type: {eq: $type}}, sort: {featured: ASC}) {
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
