import * as React from "react"
import { graphql } from "gatsby"
import RetailView from "../../views/retail-view"

export const query = graphql`
  query RetailQuery($slug: String!) {
    strapiRetail(slug: { eq: $slug }) {
      id
      title
      type
      series
      crew
      capacity
      length
      hullweight
      riggedweight
      width
      thickness
      volume
      inflatable
      demo
      type
      excerpt
      
      brand {
        name
      }

      childStrapiRetailDescriptionTextnode {
        description
      }

      childStrapiRetailFeaturesTextnode {
        features
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

    allStrapiRetail(filter: {slug: {nin: [$slug] }}, limit: 2) {
      nodes {
        title
        slug
        excerpt
        width
        length
        type

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
  }
`

const RetailPage = ({ data }) => {
  const retail = data.strapiRetail;
  const other = data.allStrapiRetail;
  return (
    <RetailView
      retail={retail}
      other={other}
    />
  );
};

export default RetailPage;
