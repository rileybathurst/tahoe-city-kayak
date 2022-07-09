import * as React from "react"
import { graphql } from "gatsby"
import RetailView from "../../views/retail-view"

export const query = graphql`
  query RetailQuery($slug: String!) {
    strapiRetail(slug: { eq: $slug }) {
      id
      title
      brand
      type
      capacity

      description {
        data {
          description
        }
      }

      features {
        data {
          internal {
            content
          }
          features
        }
      }
    }

    allStrapiRetail(filter: {slug: {nin: [$slug] }}) {
      nodes {
        title
        slug
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
