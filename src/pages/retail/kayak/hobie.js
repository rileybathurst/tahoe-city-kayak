import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

import Brand from "../../../views/brand";
import KayakBrandCard from "../../../components/kayak-brand-card";

const HobieView = () => {
  return (
    <Brand
      name="hobie"
    >

      {/* // ? can I fold this inside the wrapper */}
      {<StaticQuery
        query={query}
        render={data => (
          <>
            {
              <>

                <article>
                  <h2>Mirage Series</h2>
                </article>

                <section className="deck">
                  {
                    data.mirage.edges.map(retail => (
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
                  <h2>Island Series</h2>
                </article>

                <section className="deck">
                  {
                    data.island.edges.map(retail => (
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
                  <h2>Inflatable Series</h2>
                </article>

                <section className="deck">
                  {
                    data.inflatable.edges.map(retail => (
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

export default HobieView

const query = graphql`
query HobieKayakQuery {
  mirage: allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "hobie"},
    series: {eq: "mirage"}
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
  
  island: allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "hobie"},
    series: {eq: "island"}
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
  
  inflatable: allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "hobie"},
    series: {eq: "inflatable"}
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
