import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

import Brand from "../../../views/brand";
import KayakBrandCard from "../../../components/kayak-brand-card";

const RetailPerceptionPage = () => {
  return (
    <Brand
      name="Perception"
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

export default RetailPerceptionPage

const query = graphql`
  query PerceptionlineQuery {
    allStrapiRetail(
      filter: {type: {eq: "kayak"},
      brand: {eq: "perception"}}
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