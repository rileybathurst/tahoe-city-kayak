import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

import Brand from "../../../views/brand";
import SupBrandCard from "../../../components/sup-brand-card";

const RetailHalaSupPage = () => {
  return (
    <Brand
      name="hala"
      type="sup"
    >

      {/* // ? can I fold this inside the wrapper */}
      {<StaticQuery
        query={query}
        render={data => (
          <>
            {
              <section className="deck">
                {
                  data.allStrapiRetail.edges.map(retail => (
                    <SupBrandCard
                      id={retail.node.id}
                      slug={retail.node.slug}
                      title={retail.node.title}
                      capacity={retail.node.capacity}
                      length={retail.node.length}
                      width={retail.node.width}
                      excerpt={retail.node.excerpt}
                      cutout={retail.node?.cutout}
                    />
                  ))
                }
              </section>
            }
          </>
        )}
      />}

    </Brand>
  )
}

export default RetailHalaSupPage

const query = graphql`
query HalaSupQuery {
  allStrapiRetail(
    filter: {type: {eq: "sup"},
    brand: {eq: "hala"}}
    ) {
    edges {
      node {
        id
        title
        slug
        excerpt
        width
        length
        capacity

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
}
`
