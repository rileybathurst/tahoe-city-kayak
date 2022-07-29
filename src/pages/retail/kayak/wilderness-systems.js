import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

import Brand from "../../../views/brand";
import KayakBrandCard from "../../../components/kayak-brand-card";

const RetailWildernessSystemsPage = () => {
  return (
    <Brand
      name="Wilderness Systems"
      type="kayak"
    >

      {<StaticQuery
        query={query}
        render={data => (
          <>
            {
              <>

                <article>
                  <h2>Sit On Top Series</h2>
                </article>

                <section className="deck">
                  {
                    data.sitontop.edges.map(retail => (
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

                <article>
                  <h2>Recreational Series</h2>
                </article>

                <section className="deck">
                  {
                    data.recreational.edges.map(retail => (
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
              </>
            }
          </>
        )}
      />}

    </Brand>
  )
}

export default RetailWildernessSystemsPage

const query = graphql`
query WildernessSystemslineQuery {
  sitontop: allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "wilderness systems"},
    series: {eq: "sit-on-top"}
  }) {
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
  
  recreational: allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "wilderness systems"},
    series: {eq: "recreational"}
  }) {
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
