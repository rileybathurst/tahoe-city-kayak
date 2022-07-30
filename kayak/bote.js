import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

import Brand from "../../../views/brand";
import KayakBrandCard from "../../../components/kayak-brand-card";

const RetailBotePage = () => {
  return (
    <Brand
      name="bote"
      type="kayak"
    >

      {<StaticQuery
        query={query}
        render={data => (
          <>
            {
              <section className="deck">
                {
                  data.allStrapiRetail.edges.map(retail => (
                    <KayakBrandCard
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

export default RetailBotePage

const query = graphql`
query BoteQuery {
  allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "bote"}}
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
}
`
